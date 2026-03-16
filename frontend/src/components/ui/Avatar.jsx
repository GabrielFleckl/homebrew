import { useEffect, useState } from "react";
import DefaultUserAvatar from "../icons/DefaultUserAvatarIcon";
import { getStrapiUrl } from "../../lib/utils";

import api from "../../lib/axios/api";

function Avatar({ userId }) {
  const token = localStorage.getItem("jwt");

  const [user, setUser] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const userCanEdit = userId === currentUserId;

  // ===============================
  // FETCH USER + CURRENT USER
  // ===============================
  const fetchData = async () => {
    setLoading(true);
    try {
      const [userRes, meRes] = await Promise.all([
        api.get(`/api/users/${userId}?populate=avatar`),
        api.get(`/api/users/me`),
      ]);

      setUser(userRes.data);
      setCurrentUserId(meRes.data.id);
    } catch (error) {
      console.error("Erro ao buscar dados do usuário:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId && token) {
      fetchData();
    }
  }, [userId, token, uploading]);

  // ===============================
  // UPLOAD AVATAR
  // ===============================
  const handleUpload = async () => {
    if (!selectedFile || !userCanEdit) return;

    setUploading(true);

    try {
      // Deleta avatar antigo se existir
      if (user?.avatar?.id) {
        await api.delete(`/api/upload/files/${user.avatar.id}`);
      }

      const formData = new FormData();
      formData.append("files", selectedFile);
      formData.append("ref", "plugin::users-permissions.user");
      formData.append("refId", userId);
      formData.append("field", "avatar");

      await api.post(`/api/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (error) {
      console.error("Erro ao fazer upload do avatar:", error);
    } finally {
      setUploading(false);
      setSelectedFile(null);
    }
  };

  // ===============================
  // DELETE AVATAR
  // ===============================
  const handleDelete = async () => {
    if (!user?.avatar?.id || !userCanEdit) return;

    setUploading(true);
    try {
      await api.delete(`/api/upload/files/${user.avatar.id}`);
    } catch (error) {
      console.error("Erro ao deletar avatar:", error);
    } finally {
      setUploading(false);
    }
  };

  // ===============================
  // RENDER
  // ===============================
  if (loading) {
    return (
      <div className="grid h-40 w-40 place-items-center rounded-full bg-slate-800">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="relative h-40 w-40 min-w-41">
      {user?.avatar?.url ? (
        <img
          src={`${getStrapiUrl(user.avatar.url)}?t=${user.avatar.updatedAt}`}
          alt="User avatar"
          className="h-full w-full rounded-full object-cover"
        />
      ) : (
        <div className="h-full w-full overflow-hidden rounded-full">
          <DefaultUserAvatar />
        </div>
      )}

      {userCanEdit && (
        <>
          <button
            className="absolute inset-0 h-40 w-40 min-w-41 rounded-full border-none bg-transparent text-transparent transition duration-200 hover:cursor-pointer hover:bg-slate-950/60 hover:text-white"
            onClick={() => document.getElementById("avatar_modal").showModal()}
          >
            Mudar avatar
          </button>

          <dialog
            id="avatar_modal"
            className="modal modal-bottom sm:modal-middle"
          >
            <div className="modal-box flex flex-col justify-center gap-5 bg-slate-900/90 p-8 text-slate-900">
              <input
                type="file"
                className="file-input file-input-md m-auto w-full max-w-xs"
                onChange={(e) => setSelectedFile(e.target.files[0])}
              />

              <div className="mt-5 flex flex-col gap-3">
                <button
                  className="btn"
                  onClick={handleUpload}
                  disabled={uploading}
                >
                  {uploading ? "Enviando..." : "Carregar avatar"}
                </button>

                {user?.avatar && (
                  <button
                    className="btn btn-error"
                    onClick={handleDelete}
                    disabled={uploading}
                  >
                    {uploading ? "Apagando..." : "Apagar avatar"}
                  </button>
                )}
              </div>

              <form method="dialog">
                <button className="btn btn-circle btn-sm absolute top-2 right-2">
                  ✕
                </button>
              </form>
            </div>
          </dialog>
        </>
      )}
    </div>
  );
}

export default Avatar;
