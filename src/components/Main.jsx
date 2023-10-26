import { useState } from "react";
import Listbox from "./Listbox";
import Watchedbox from "./Watchedbox";
function Main() {
  return (
    <main className="main">
      <Listbox />
      <Watchedbox />
    </main>
  );
}
export default Main;
