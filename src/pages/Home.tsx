import { useNavigate } from "react-router";
import { UserContext } from "@/contextApi/UserContextProvider";
import { useContext, useEffect } from "react";
import { Item, ItemContent } from "@/components/ui/item";
import CustomDilogbox from "@/components/CustomDilogbox";
import { GetUserTodos } from "@/api/api";
import { Checkbox } from "@/components/ui/checkbox";
import { GetUserDetails } from "@/api/api";
import { Spinner } from "@/components/ui/spinner";

const Home = () => {
  const navigator = useNavigate();
  const { todos, setTodos } = useContext(UserContext)!;

  useEffect(() => {
    const fetchData = async () => {
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");
      const tokens = accessToken || refreshToken;
      if (!tokens) {
        navigator("/login");
      } else {
        try {
          const userId = await GetUserDetails(
            null,
            null,
            accessToken,
            refreshToken,
          ).then((data) => {
            if (data.message) {
              console.log(data.message);
              navigator("/login");
            } else {
              if (typeof data.id === "number") {
                return data.id;
              }
            }
          });
          const GetTodos = await GetUserTodos(userId);
          setTodos(GetTodos.todos);
        } catch {
          console.log("error");
        }
      }
    };
    fetchData();
  }, []);
  if (!todos) {
    return (
      <>
        <div className=" flex flex-col items-center justify-center h-full bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 p-6">
          <Spinner />
          <span className="text-lg tabular-nums">Loding your Data</span>
        </div>
      </>
    );
  }
  return (
    <section className="flex flex-col gap-6 h-full w-full items-center justify-center">
      <h1 className="font-bold text-2xl">Todos List</h1>
      <div className="flex w-full max-w-xl flex-col gap-6">
        {todos ? (
          todos.map((todo) => (
            <Item variant={"outline"} key={`todo-${todo.id}`}>
              <ItemContent
                className={`${todo.completed ? "line-through" : ""}`}
              >
                {todo.todo}
              </ItemContent>
              <Checkbox
                checked={todo.completed}
                onCheckedChange={() => {
                  setTodos((prev) =>
                    prev.map((t) =>
                      t.id === todo.id ? { ...t, completed: !t.completed } : t,
                    ),
                  );
                }}
              />
              <CustomDilogbox
                id={todo.id}
                Trigger={"Edit"}
                Title={"Edit Todo"}
                Deccription={"Edit your todo"}
              />
              <CustomDilogbox
                id={todo.id}
                Trigger={"Delete"}
                Title={"Delete Todo"}
                Deccription={"Are you sure you want to delete this todo?"}
                hideinput={true}
              />
            </Item>
          ))
        ) : (
          <div>loding</div>
        )}
      </div>
      <Item variant={"outline"} className="max-w-3xs">
        <CustomDilogbox
          id={"new"}
          Trigger={"Add New Todo"}
          Title={"Add New Todo"}
          Deccription={"Add new todo to your list"}
        />
      </Item>
    </section>
  );
};

export default Home;
