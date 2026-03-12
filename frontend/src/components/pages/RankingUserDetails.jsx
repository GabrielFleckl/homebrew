import { useParams } from "react-router-dom";
import { useState } from "react";
import UserNavBar from "../layout/UserNavBar";
import UserHeader from "@/components/user/UserHeader";
import Loading from "../ui/Loading";
import useRankingId from "../../hooks/useRankingId";
import SearchIcon from "../icons/SearchIcon";
import useFilteredCategories from "../../hooks/useFilteredCategories";
import { formatUsername } from "../../lib/utils";

function RankingUserDetails() {
  const { userId } = useParams();
  const [searchTerm, setSearchTerm] = useState("");

  const {
    loading,
    RegistrationDate,
    categories,
    bio,
    birthday,
    completedSubcategories,
    instagramURL,
    username,
    equipment,
    brewfatherURL,
  } = useRankingId(userId);

  const filteredCategories = useFilteredCategories(categories, searchTerm);

  return (
    <div className="px-4 pt-4 text-white md:px-8">
      <UserNavBar />
      <main className="container mx-auto mt-8 rounded-xl md:p-6">
        {loading ? (
          <Loading />
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-[40%_2fr] lg:grid-cols-[25%_2fr]">
            <div className="col-span-1 mb-8">
              <UserHeader
                username={formatUsername(username)}
                userId={userId}
                registerDate={RegistrationDate}
                bio={bio}
                instagram={instagramURL}
                birthday={birthday}
                equipment={equipment}
                brewfatherURL={brewfatherURL}
              />
            </div>

            <div className="col-span-1">
              <p className="w-full rounded-xl border-2 border-slate-400/50 p-5 font-bold backdrop-blur-lg md:text-2xl">
                Total: {completedSubcategories}/127
              </p>
              <label className="input my-5 flex w-full items-center gap-2 rounded-lg bg-slate-950/60 p-2">
                <SearchIcon />
                <input
                  type="text"
                  className="grow placeholder:font-normal placeholder:text-white"
                  placeholder="Procurar..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </label>
              {filteredCategories.map((cat) => (
                <div
                  className="mb-5 flex flex-col gap-5 rounded-xl bg-slate-600/50 p-5 backdrop-blur-lg"
                  key={cat.id}
                >
                  <h1 className="text-2xl font-semibold">{cat.name}</h1>
                  {cat.subcategories.map((sub) => (
                    <div className="flex justify-between" key={sub.id}>
                      <ul>
                        <li className="pl-3">{sub.name}</li>
                      </ul>
                      <input
                        type="checkbox"
                        className="checkbox bg-slate-50/50"
                        checked={sub.completed}
                        readOnly
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default RankingUserDetails;
