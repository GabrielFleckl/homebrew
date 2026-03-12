import { useState } from "react";

import api from "../../lib/axios/api";
import UserNavBar from "../layout/UserNavBar";
import UserHeader from "@/components/user/UserHeader";
import Loading from "../ui/Loading";
import useCategories from "../../hooks/useCategories";
import SearchIcon from "../icons/SearchIcon";
import useFilteredCategories from "../../hooks/useFilteredCategories";
import useMe from "../../hooks/useMe";

function UserProfile() {
  const [updating, setUpdating] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const { categories, setCategories, totalCompleted, loading, refetch } =
    useCategories();

  // Get API /me data to use in UserHeader
  const { currentUser } = useMe();

  const filteredCategories = useFilteredCategories(categories, searchTerm);

  const handleCheck = async (subcategoryId, categoryId) => {
    setUpdating(true);

    const token = localStorage.getItem("jwt");

    try {
      const response = await api.post(
        "/api/user-subcategories/update-status",
        {
          userId: currentUser.id,
          subcategoryId: subcategoryId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setCategories((prevCategories) =>
          prevCategories.map((category) =>
            category.id === categoryId
              ? {
                  ...category,
                  subcategories: category.subcategories.map((subcategory) =>
                    subcategory.id === subcategoryId
                      ? { ...subcategory, completed: !subcategory.completed }
                      : subcategory
                  ),
                }
              : category
          )
        );

        refetch();
      } else {
        console.log("Algo deu errado. Por favor, tente novamente.");
      }
    } catch (e) {
      console.log(e);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="text-white">
      <UserNavBar />
      <main className="container mx-auto mt-8 w-full rounded-xl md:px-8 md:py-2">
        {loading ? (
          <Loading />
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-[40%_2fr] lg:grid-cols-[25%_2fr]">
            <div className="col-span-1 mb-8">
              <UserHeader
                userProfile
                username={currentUser.username}
                bio={currentUser.bio}
                userId={currentUser.id}
                registerDate={currentUser.registerDate}
                birthday={currentUser.birthday}
                instagram={currentUser.InstagramURL}
                brewfatherURL={currentUser.BrewfatherURL}
                equipment={currentUser.equipment}
              />
            </div>

            <div className="col-span-1">
              <p className="w-full rounded-xl border-2 border-slate-400/50 p-5 font-bold backdrop-blur-lg md:text-2xl">
                Total: {totalCompleted}/127
              </p>
              <label className="input my-5 flex w-full items-center gap-2 rounded-lg bg-slate-950/60 p-2">
                <SearchIcon />
                <input
                  type="text"
                  className="grow bg-transparent outline-hidden placeholder:font-normal placeholder:text-white"
                  placeholder="Procurar..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </label>

              {filteredCategories.map((category, index) => (
                <div
                  className="mb-5 flex flex-col gap-5 rounded-xl bg-slate-600/50 p-4 backdrop-blur-lg"
                  key={index}
                >
                  <h1 className="text-xl font-semibold md:text-2xl">
                    {category.name}
                  </h1>
                  {category.subcategories.map((subcategory, index) => (
                    <div
                      className="flex items-center justify-between"
                      key={index}
                    >
                      <ul>
                        <li className="pl-3">{subcategory.name}</li>
                      </ul>

                      <div
                        className="tooltip tooltip-top"
                        data-tip="Clique para completar"
                      >
                        <input
                          type="checkbox"
                          className="checkbox bg-slate-50/50"
                          checked={subcategory.completed}
                          disabled={updating}
                          onChange={() =>
                            handleCheck(subcategory.id, category.id)
                          }
                        />
                      </div>
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

export default UserProfile;
