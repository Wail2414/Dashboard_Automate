import MyComponent from "./components/MyComponent";
import LineChart from "./components/LineChart";
import LineCharto from "./components/LineCharto";
import BarGraph from "./components/BarGraph";
import CircleGraph from "./components/CircleGraph";
import RadarGraph from "./components/RadarGraph";
import ScatterGraph from "./components/ScatterGraph";
import DragBox from "./DraggableBox/DragBox";
import Drag from "./DraggableBox/MyResponsiveGrid";
import Sidebar from "./components/Sidebar";
//test
export default function Home() {
  return (
    <main>
      <div>
        {/*<Drag />*/}
        <Sidebar />
      </div>
    </main>
  );
}
