import { Chart } from "react-google-charts";

export const data = [
    ["Element", "Lượt xem", { role: "style" }],
    ["Tháng 1", 110, "#b87333"],
    ["Tháng 2", 200, "silver"],
    ["Tháng 3", 150, "gold"],
    ["Tháng 4", 160, "blue"],
    ["Tháng 5", 290, "red"],
    ["Tháng 6", 400, "silver"],
    ["Tháng 7", 500, "purple"],
    ["Tháng 8", 321, "grey"],
    ["Tháng 9", 420, "gold"],
    ["Tháng 10", 311, "green"],
    ["Tháng 11", 200, "pink"],
    ["Tháng 12", 200, "brown"],
];
export const options = {
    chart: {
        title: "Thống kê lượt xem phim đang chiếu",
    },
    hAxis: {
        title: "Total Population",
        minValue: 0,
    },
    vAxis: {
        title: "City",
    },
    bars: "horizontal",
    axes: {
        y: {
            0: { side: "right" },
        },
    },
};
export const data2 = [
    ["Phim", "Ghế Thường", "Ghế Vip"],
    ["Dragon Ball Super Heroes", 81750, 80080],
    ["Batman", 37920, 36940],
    ["Spiderman", 26950, 28960],
    ["Kẻ cắp mặt trời", 20990, 19000],
    ["Doraemon", 15260, 1500],
];

export function Dashboard() {
    return (
        <>
            <div>
                <div style={{ display: "flex" }}>
                    <Chart
                        chartType="Bar"
                        width="60%"
                        height="400px"
                        data={data2}
                        options={options}
                    />
                </div>
                <div style={{ display: "flex" }}>
                    <Chart
                        chartType="ColumnChart"
                        width="60%"
                        height="400px"
                        data={data2}
                    />
                    <div>Thống kê lượt xem từng tháng</div>
                </div>
            </div>
        </>
    );
}
