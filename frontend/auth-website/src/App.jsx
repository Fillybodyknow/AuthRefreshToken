import AppRoutes from "./app-route/route";

function App() {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh", width: "100vw" }}
    >
      {/* Card หรือ Route จะอยู่กลางจอ */}
      <div style={{ width: "100%"}}>
        <AppRoutes />
      </div>
    </div>
  );
}

export default App;
