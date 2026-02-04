import { useMemo, useReducer } from "react";
import TeamSelect from "./ui/screens/TeamSelect";
import BattleScreen from "./ui/screens/BattleScreen";
import RewardScreen from "./ui/screens/RewardScreen";

const initial = { screen: "select", run: null };

function reducer(state, action) {
  switch (action.type) {
    case "START_RUN":
      return { ...state, screen: "battle", run: action.run };
    case "WIN_BATTLE":
      return { ...state, screen: "reward", run: action.run };
    case "CONTINUE":
      return { ...state, screen: "battle", run: action.run };
    case "LOSE_RUN":
      return { ...state, screen: "select", run: null };
    default:
      return state;
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initial);

  if (state.screen === "select") return <TeamSelect onStart={(run) => dispatch({ type: "START_RUN", run })} />;
  if (state.screen === "battle") return <BattleScreen run={state.run} dispatch={dispatch} />;
  return <RewardScreen run={state.run} dispatch={dispatch} />;
}
