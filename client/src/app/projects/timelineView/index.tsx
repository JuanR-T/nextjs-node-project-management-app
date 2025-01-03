import { useGetTasksQuery } from "@/state/api";
import "gantt-schedule-timeline-calendar/dist/style.css";
import { useCallback, useEffect } from "react";
import { formatDate } from "../../../lib/utils";
interface TimelineProps {
    id: string;
    setIsModalNewTaskOpen: (isOpen: boolean) => void;
}

export const Timeline = ({ id, setIsModalNewTaskOpen }: TimelineProps) => {
    const {
        data: tasks,
        error,
        isLoading,
    } = useGetTasksQuery({ projectId: Number(id) });

    var GSTC: any;
    var gstc: any;
    var state: any;

    const initializeGSTC = async (element: any) => {
        GSTC = (await import("gantt-schedule-timeline-calendar")).default;
        const TimelinePointer = (await import("gantt-schedule-timeline-calendar/dist/plugins/timeline-pointer.esm.min.js"))
            .Plugin;
        const Selection = (await import("gantt-schedule-timeline-calendar/dist/plugins/selection.esm.min.js")).Plugin;
        const ItemResizing = (await import("gantt-schedule-timeline-calendar/dist/plugins/item-resizing.esm.min.js")).Plugin;
        const ItemMovement = (await import("gantt-schedule-timeline-calendar/dist/plugins/item-movement.esm.min.js")).Plugin;
        const generateRows = () => {
            if (!tasks) {
                console.error("Tasks are undefined or null");
                return {};
            }
            const rows: import("gantt-schedule-timeline-calendar").Rows = {};
            tasks?.map((task) => {
                const id = GSTC.api.GSTCID(task.id.toString());
                rows[id] = {
                    id,
                    label: task.title,
                };
            });
            return rows;
        }

        const generateItems = () => {
            const items: import("gantt-schedule-timeline-calendar").Items = {};

            let start = GSTC.api.date().startOf("day").subtract(6, "day");
            tasks?.map((task) => {
                const id = GSTC.api.GSTCID(task.id.toString());
                const rowId = GSTC.api.GSTCID(task.id.toString());
                const formmattedDates = formatDate({ startDate: task.startDate, dueDate: task.dueDate });

                items[id] = {
                    id,
                    label: task.title,
                    rowId,
                    time: {
                        start: formmattedDates.startDate ?? 0,
                        end: formmattedDates.dueDate ?? 0,
                    },
                };
            })
            return items;
        }
        const rows = generateRows();
        const items = generateItems();
        const config = {
            licenseKey:
                "====BEGIN LICENSE KEY====\nXOfH/lnVASM6et4Co473t9jPIvhmQ/l0X3Ewog30VudX6GVkOB0n3oDx42NtADJ8HjYrhfXKSNu5EMRb5KzCLvMt/pu7xugjbvpyI1glE7Ha6E5VZwRpb4AC8T1KBF67FKAgaI7YFeOtPFROSCKrW5la38jbE5fo+q2N6wAfEti8la2ie6/7U2V+SdJPqkm/mLY/JBHdvDHoUduwe4zgqBUYLTNUgX6aKdlhpZPuHfj2SMeB/tcTJfH48rN1mgGkNkAT9ovROwI7ReLrdlHrHmJ1UwZZnAfxAC3ftIjgTEHsd/f+JrjW6t+kL6Ef1tT1eQ2DPFLJlhluTD91AsZMUg==||U2FsdGVkX1/SWWqU9YmxtM0T6Nm5mClKwqTaoF9wgZd9rNw2xs4hnY8Ilv8DZtFyNt92xym3eB6WA605N5llLm0D68EQtU9ci1rTEDopZ1ODzcqtTVSoFEloNPFSfW6LTIC9+2LSVBeeHXoLEQiLYHWihHu10Xll3KsH9iBObDACDm1PT7IV4uWvNpNeuKJc\npY3C5SG+3sHRX1aeMnHlKLhaIsOdw2IexjvMqocVpfRpX4wnsabNA0VJ3k95zUPS3vTtSegeDhwbl6j+/FZcGk9i+gAy6LuetlKuARjPYn2LH5Be3Ah+ggSBPlxf3JW9rtWNdUoFByHTcFlhzlU9HnpnBUrgcVMhCQ7SAjN9h2NMGmCr10Rn4OE0WtelNqYVig7KmENaPvFT+k2I0cYZ4KWwxxsQNKbjEAxJxrzK4HkaczCvyQbzj4Ppxx/0q+Cns44OeyWcwYD/vSaJm4Kptwpr+L4y5BoSO/WeqhSUQQ85nvOhtE0pSH/ZXYo3pqjPdQRfNm6NFeBl2lwTmZUEuw==\n====END LICENSE KEY====",
            plugins: [TimelinePointer(), Selection(), ItemResizing(), ItemMovement()],
            list: {
                columns: {
                    data: {
                        [GSTC.api.GSTCID("id")]: {
                            id: GSTC.api.GSTCID("id"),
                            width: 60,
                            data: ({ row }: any) => GSTC.api.sourceID(row.id),
                            header: {
                                content: "ID",
                            },
                        },
                        [GSTC.api.GSTCID("label")]: {
                            id: GSTC.api.GSTCID("label"),
                            width: 200,
                            data: "label",
                            header: {
                                content: "Label",
                            },
                        },
                    },
                },
                rows,
            },
            chart: {
                items,
            },
        };

        state = GSTC.api.stateFromConfig(config);
        if (!element || !state) {
            console.error("GSTC or state is undefined or null");
            return;
        }
        gstc = GSTC({
            element,
            state,
        });
        console.log("lcgstc", gstc);
    }
    const generateTimelineCallback = useCallback((element: any) => {
        if (!element) return;
        if (isLoading || error || !tasks) {
            console.error("Tasks not ready, cannot initialize GSTC.");
            return;
        }
        initializeGSTC(element);
    }, [isLoading, error, tasks]);

    useEffect(() => {
        return () => {
            if (gstc) {
                gstc.destroy();
            }
        };
    });

    function updateFirstRow() {
        if (!GSTC || !state) return;
        state.update(`config.list.rows.${GSTC.api.GSTCID("0")}`, (row: any) => {
            row.label = "Changed dynamically";
            return row;
        });
    }

    return (
        <div className="container">
            <button onClick={updateFirstRow}>Change row 1 label</button>
            <hr />
            <div id="gstc" ref={generateTimelineCallback}></div>

            <style jsx global>{`
                html,
                body {
                padding: 0;
                margin: 0;
                font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans,
                    Droid Sans, Helvetica Neue, sans-serif;
                }

                * {
                    box-sizing: border-box;
                }
                `}
            </style>
        </div>
    );
}