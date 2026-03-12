import { useEffect, useState } from "react";
import Avatar from "@/components/ui/Avatar";
import InstaIcon from "@/components/icons/InstaIcon";
import CakeIcon from "@/components/icons/CakeIcon";
import BeerIcon from "@/components/icons/BeerIcon";

import useMedals from "@/hooks/useMedals";
import Loading from "@/components/ui/Loading";
import MedalBadge from "@/components/ui/MedalBadge";
import api from "@/lib/axios/api";

// To do
// Fazer que puxe daqui o /me e separe do myprofile, nao dependendo das props
// Mudar logica de atualizar infos do user, pode atualizar parcialmente com PUT
// refecth quando atualizar perfil

function UserHeader({
  username,
  userProfile,
  userId,
  bio,
  equipment,
  registerDate,
  birthday,
  instagram,
  brewfatherURL,
}) {
  const [newBio, setNewBio] = useState(bio || "");
  const [newEquipment, setNewEquipment] = useState(equipment || "");
  const [newBirthday, setNewBirthday] = useState(birthday || "");
  const [newInstagramURL, setNewInstagramURL] = useState(instagram || "");
  const [newBrewfatherURL, setNewBrewfatherURL] = useState(brewfatherURL || "");

  // Medal

  const [medalTitle, setMedalTitle] = useState("");
  const [medalDescription, setMedalDescription] = useState("");
  const [medalType, setMedalType] = useState("");
  const [selectedMedalId, setSelectedMedalId] = useState("");

  const formatDateToDDMMYYYY = (dateStr) => {
    const [year, month, day] = dateStr.split("-");
    return `${day}/${month}/${year}`;
  };

  async function handleUpdateProfile() {
    const token = localStorage.getItem("jwt");

    if (!token) return;

    try {
      await api.put(
        `/api/users/${userId}`,
        {
          birthday: newBirthday,
          BrewfatherURL: newBrewfatherURL,
          equipment: newEquipment,
          InstagramURL: newInstagramURL,
          bio: newBio,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      document.getElementById("my_modal_3").close();
    } catch (e) {
      console.log(e);
    }
  }

  async function handleCreateMedal() {
    const token = localStorage.getItem("jwt");

    if (!token) return;

    if (!medalTitle || !medalDescription || !medalType) {
      alert("Preencha todos os campos");
      return;
    }

    try {
      await api.post(
        `/api/medals`,
        {
          data: {
            title: medalTitle,
            medal: medalType,
            Description: medalDescription,
            users_permissions_user: userId,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await refetch();

      setMedalTitle("");
      setMedalDescription("");
      setMedalType("");

      document.getElementById("my_modal_1").close();
    } catch (e) {
      console.log(e);
    }
  }

  async function handleDeleteMedal() {
    const token = localStorage.getItem("jwt");

    if (!token) return;

    if (!selectedMedalId) {
      alert("Preencha todos os campos");
      return;
    }

    try {
      await api.delete(`/api/medals/${selectedMedalId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      await refetch();
      setSelectedMedalId("");

      document.getElementById("my_modal_2").close();
    } catch (e) {
      console.log(e);
    }
  }

  // CRUD MEDALHAS
  const { medals, loading, refetch } = useMedals(userId);

  useEffect(() => {
    if (userId) {
      refetch();
    }
  }, [userId]);

  return (
    <div className="flex min-h-106.25 flex-col items-center justify-evenly rounded-lg bg-slate-950/60 px-3 py-8">
      <Avatar userId={userId} />

      <div className="mt-3 flex flex-col items-center gap-1">
        <h1 className="px-2 text-center text-lg md:text-2xl">
          {userProfile ? (
            <label className="capitalize">{username}</label>
          ) : (
            <label className="capitalize">{username}</label>
          )}
        </h1>
      </div>

      <div className="flex w-full flex-col justify-between gap-4 rounded-xl">
        <div className="my-3 ml-2">
          <ul className="flex flex-col flex-nowrap items-start justify-center gap-3">
            {instagram && (
              <li className="flex items-center gap-2">
                <InstaIcon />
                <p className="cursor-pointer font-light">
                  <a href={instagram} target="_blank" rel="noopener noreferrer">
                    Instagram
                  </a>
                </p>
              </li>
            )}

            {brewfatherURL && (
              <li className="flex items-center gap-2">
                <BeerIcon />
                <p className="cursor-pointer font-light">
                  <a
                    href={brewfatherURL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Brewfather
                  </a>
                </p>
              </li>
            )}

            {birthday && (
              <li
                className="md:tooltip flex cursor-pointer items-center gap-2"
                data-tip={"Cadastrado em " + registerDate}
              >
                <CakeIcon />
                <p className="font-light">{formatDateToDDMMYYYY(birthday)}</p>
              </li>
            )}
          </ul>
        </div>

        <div role="tablist" className="tabs tabs-border w-full grid-cols-2">
          {/* TAB 1 */}
          <input
            type="radio"
            name="my_tabs_1"
            role="tab"
            className="tab text-white"
            aria-label="Info"
            defaultChecked
          />
          <div role="tabpanel" className="tab-content min-h-80 w-full">
            <div className="mt-2 flex flex-col gap-4">
              {bio ? (
                <>
                  <label>Bio</label>
                  <div className="rounded-md bg-slate-600/20 backdrop-blur-md">
                    <p className="h-24 overflow-auto px-2 py-3 text-sm font-normal">
                      {bio}
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <label>Bio</label>
                  <div className="rounded-md bg-slate-600/20 backdrop-blur-md">
                    <p className="h-24 overflow-auto px-2 py-3 text-sm font-normal">
                      Este usuário ainda não adicionou uma bio.
                    </p>
                  </div>
                </>
              )}
              {equipment ? (
                <>
                  <label>Equipamento</label>
                  <div className="rounded-md bg-slate-600/20 backdrop-blur-md">
                    <p className="h-24 overflow-auto px-2 py-3 text-sm font-normal">
                      {equipment}
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <label>Equipamento</label>
                  <div className="rounded-md bg-slate-600/20 backdrop-blur-md">
                    <p className="h-24 overflow-auto px-2 py-3 text-sm font-normal">
                      Este usuário ainda não adicionou equipamentos.
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* TAB 2 */}
          <input
            type="radio"
            name="my_tabs_1"
            role="tab"
            className="tab text-white"
            aria-label="Medalhas"
          />
          <div
            role="tabpanel"
            className="tab-content min-h-80 w-full px-2 py-4"
          >
            <div className="flex flex-col gap-2">
              {loading ? (
                <Loading />
              ) : (
                <>
                  {medals.map((medal) => (
                    <div
                      key={medal.id}
                      title={medal.attributes.Description}
                      className="flex gap-2"
                    >
                      <MedalBadge type={medal.attributes.medal} />
                      <label>{medal.attributes.title}</label>
                    </div>
                  ))}

                  {medals.length === 0 && (
                    <p className="text-center text-sm">
                      Este usuário ainda não possui medalhas 🥇
                    </p>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {userProfile && (
        <>
          <button
            className="btn mt-5 w-full rounded-full bg-slate-500/50 text-white backdrop-blur-xs hover:text-white hover:opacity-90"
            onClick={() => document.getElementById("my_modal_3").showModal()}
          >
            Editar Perfil
          </button>

          <dialog
            id="my_modal_3"
            className="modal modal-bottom sm:modal-middle"
          >
            <div className="modal-box h-[70vh] space-y-6 overflow-y-scroll rounded-2xl bg-slate-900/90 p-8 text-white">
              <div
                role="tablist"
                className="tabs tabs-border w-full grid-cols-2"
              >
                {/* TAB 1 */}
                <input
                  type="radio"
                  name="my_tabs_2"
                  role="tab"
                  className="tab text-white"
                  aria-label="Info"
                  defaultChecked
                />
                <div role="tabpanel" className="tab-content w-full">
                  <h2 className="my-4 text-center text-xl font-semibold">
                    Editar Perfil
                  </h2>
                  <form className="flex flex-col gap-4">
                    <fieldset className="fieldset w-full">
                      <label className="label text-slate-200">Bio</label>
                      <textarea
                        placeholder="Descrição..."
                        className="textarea h-28 w-full bg-slate-100 text-slate-900"
                        value={newBio}
                        onChange={(e) => setNewBio(e.target.value)}
                      />
                    </fieldset>

                    <fieldset className="fieldset w-full">
                      <label className="label text-slate-200">
                        Equipamento
                      </label>
                      <textarea
                        placeholder="Equipamentos..."
                        className="textarea h-28 w-full bg-slate-100 text-slate-900"
                        value={newEquipment}
                        onChange={(e) => setNewEquipment(e.target.value)}
                      />
                    </fieldset>

                    <fieldset className="fieldset w-full">
                      <label className="label text-slate-200">
                        Link do seu Instagram
                      </label>
                      <input
                        type="text"
                        placeholder="www.instagram.com/seuperfil"
                        className="input w-full bg-slate-100 text-slate-900"
                        value={newInstagramURL}
                        onChange={(e) => setNewInstagramURL(e.target.value)}
                      />
                    </fieldset>

                    <fieldset className="fieldset w-full">
                      <label className="label text-slate-200">
                        Link do seu Brewfather
                      </label>
                      <input
                        type="text"
                        placeholder="www.brewfather.com/seuperfil"
                        className="input w-full bg-slate-100 text-slate-900"
                        value={newBrewfatherURL}
                        onChange={(e) => setNewBrewfatherURL(e.target.value)}
                      />
                    </fieldset>

                    <fieldset className="fieldset w-full">
                      <label className="label text-slate-200">
                        Data de aniversário
                      </label>
                      <input
                        type="date"
                        className="input w-full bg-slate-100 text-slate-900"
                        value={newBirthday}
                        onChange={(e) => setNewBirthday(e.target.value)}
                      />
                    </fieldset>

                    {/* <p className="rounded bg-amber-500 p-1 text-center text-sm font-semibold text-black">
                      Atualize a pagina apos salvar para atualizar
                    </p> */}

                    <button
                      type="button"
                      onClick={handleUpdateProfile}
                      className="btn w-full rounded-full bg-slate-500/50 text-white hover:opacity-90"
                    >
                      Salvar
                    </button>
                  </form>
                </div>

                {/* TAB 2 */}
                <input
                  type="radio"
                  name="my_tabs_2"
                  role="tab"
                  className="tab text-white"
                  aria-label="Medalhas"
                />
                <div role="tabpanel" className="tab-content w-full">
                  <h2 className="my-4 text-center text-xl font-semibold">
                    Editar Medalhas
                  </h2>

                  <div className="m-auto flex w-full flex-col items-center gap-4">
                    {/* Dialog Create */}
                    <button
                      className="btn w-full"
                      onClick={() =>
                        document.getElementById("my_modal_1").showModal()
                      }
                    >
                      Criar Medalha
                    </button>
                    <dialog id="my_modal_1" className="modal">
                      <div className="modal-box h-[70vh] space-y-6 overflow-y-scroll rounded-2xl bg-slate-900/90 p-8 text-white">
                        <form method="dialog">
                          <button className="btn btn-sm btn-circle btn-ghost absolute top-2 right-2">
                            ✕
                          </button>
                        </form>

                        <form className="flex flex-col gap-4">
                          <fieldset className="fieldset w-full">
                            <label className="label text-slate-200">
                              Titulo da Medalha
                            </label>
                            <textarea
                              placeholder="Titulo da Medalha"
                              className="textarea h-20 w-full bg-slate-100 text-slate-900"
                              value={medalTitle}
                              onChange={(e) => setMedalTitle(e.target.value)}
                            />
                          </fieldset>

                          <fieldset className="fieldset w-full">
                            <label className="label text-slate-200">
                              Descrição da Medalha
                            </label>
                            <textarea
                              placeholder="Descrição da Medalha"
                              className="textarea h-20 w-full bg-slate-100 text-slate-900"
                              value={medalDescription}
                              onChange={(e) =>
                                setMedalDescription(e.target.value)
                              }
                            />
                          </fieldset>

                          <fieldset className="fieldset w-full">
                            <label className="label text-slate-200">
                              Medalha
                            </label>

                            <select
                              className="select w-full bg-slate-100 text-slate-900"
                              value={medalType}
                              onChange={(e) => setMedalType(e.target.value)}
                            >
                              <option value="" disabled>
                                Selecione a medalha
                              </option>
                              <option value="Ouro">Ouro</option>
                              <option value="Prata">Prata</option>
                              <option value="Bronze">Bronze</option>
                            </select>
                          </fieldset>

                          <button
                            type="button"
                            onClick={handleCreateMedal}
                            className="btn w-full rounded-full bg-slate-500/50 text-white hover:opacity-90"
                          >
                            Salvar
                          </button>
                        </form>
                      </div>
                    </dialog>

                    {/* Dialog Delete */}
                    <button
                      className="btn w-full"
                      onClick={() =>
                        document.getElementById("my_modal_2").showModal()
                      }
                    >
                      Deletar Medalha
                    </button>
                    <dialog id="my_modal_2" className="modal">
                      <div className="modal-box h-[70vh] space-y-6 overflow-y-scroll rounded-2xl bg-slate-900/90 p-8 text-white">
                        <form method="dialog">
                          <button className="btn btn-circle btn-ghost btn-sm absolute top-2 right-2">
                            ✕
                          </button>
                        </form>
                        <select
                          className="select w-full bg-slate-800 text-white"
                          value={selectedMedalId}
                          onChange={(e) => setSelectedMedalId(e.target.value)}
                        >
                          <option disabled value="">
                            Selecione uma medalha
                          </option>

                          {medals.map((medal) => (
                            <option key={medal.id} value={medal.id}>
                              {medal.attributes.title}
                            </option>
                          ))}
                        </select>

                        <button
                          type="button"
                          className="btn w-full rounded-full bg-slate-500/50 text-white hover:opacity-90"
                          disabled={!selectedMedalId}
                          onClick={handleDeleteMedal}
                        >
                          Deletar
                        </button>
                      </div>
                    </dialog>
                  </div>
                </div>
              </div>

              <form method="dialog">
                <button className="btn btn-circle btn-sm absolute top-4 right-4 bg-slate-50 text-slate-900">
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

export default UserHeader;
