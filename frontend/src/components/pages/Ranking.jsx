import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import api from "../../lib/axios/api";

import useMe from "../../hooks/useMe";
import { formatUsername } from "../../lib/utils";
import { getStrapiUrl } from "../../lib/utils";

import UserNavBar from "../layout/UserNavBar";
import Loading from "../ui/Loading";
import DefaultUserAvatar from "../icons/DefaultUserAvatarIcon";

function Ranking() {
  const [ranking, setRanking] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("jwt");
  const { currentUser } = useMe();

  useEffect(() => {
    const fetchRanking = async () => {
      try {
        const { data } = await api.get("/api/user-subcategories/ranking", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRanking(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRanking();
  }, []);

  return (
    <div className="text-white">
      <UserNavBar />

      <main className="m-auto mt-10 rounded-xl md:w-3/4 md:px-8 md:py-2">
        {loading ? (
          <Loading />
        ) : (
          <>
            <h1 className="mb-8 text-center text-3xl font-semibold">Ranking</h1>

            {ranking.slice(0, 10).map((rank, index) => {
              const isCurrentUser = rank.user.id === currentUser.id;
              const position = index + 1;

              return (
                <Link
                  to={isCurrentUser ? "/perfil" : `/user/${rank.user.id}`}
                  key={rank.user.id}
                >
                  <div className="mb-3 flex flex-col items-center justify-between rounded-xl bg-slate-900/50 px-5 py-4 text-center text-2xl font-semibold capitalize md:flex-row md:text-left">
                    <div className="flex flex-col items-center gap-4 md:flex-row">
                      <span
                        className={`text-xl font-bold ${
                          position === 1
                            ? "text-yellow-400"
                            : position === 2
                              ? "text-gray-300"
                              : position === 3
                                ? "text-amber-600"
                                : ""
                        }`}
                      >
                        #{position}
                      </span>
                      <div className="min-w-[82px]">
                        {rank.user.avatar ? (
                          <img
                            className="h-[82px] w-[82px] rounded-full object-cover"
                            src={getStrapiUrl(rank.user.avatar)}
                            alt="user avatar"
                          />
                        ) : (
                          <div className="h-[82px] w-[82px] overflow-hidden rounded-full">
                            <DefaultUserAvatar width="82px" height="82px" />
                          </div>
                        )}
                      </div>

                      <h1>{formatUsername(rank.user.username)}</h1>
                    </div>

                    <p>Total: {rank.completedCount} / 127</p>
                  </div>
                </Link>
              );
            })}
          </>
        )}
      </main>
    </div>
  );
}

export default Ranking;
