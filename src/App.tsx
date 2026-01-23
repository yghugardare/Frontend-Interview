import BlogList from "./components/BlogList";

function App() {
  return (
    <div className="h-screen flex flex-col ">
      <main className="h-full flex">
        <aside className="w-full lg:max-w-90 shrink-0 overflow-auto p-2">
          <BlogList />
        </aside>
        <section className="hidden lg:block grow bg-blue-300 overflow-auto">
          <p>right panel</p>
          <p>Right panel content will trigger its own scroll</p>
          <div className="h-[100px] w-[1000vh] bg-violet-300" />
          <p>Demo tall content </p>
          <div className="h-[100vh] bg-purple-200" />
        </section>
      </main>
    </div>
  );
}

export default App;
