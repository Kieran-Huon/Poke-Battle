export default function RewardScreen({ run, dispatch }) {
  return (
    <div style={{ padding: 20 }}>
      <h2>Reward Screen</h2>
      <button onClick={() => dispatch({ type: "CONTINUE", run })}>
        Continuer
      </button>
    </div>
  );
}
