import { parseISO } from "date-fns";

export const dataGridClassNames =
    "border border-gray-200 bg-white shadow dark:border-stroke-dark dark:bg-dark-secondary dark:text-gray-200";

export const dataGridSxStyles = (isDarkMode: boolean) => {
    return {
        "& .MuiDataGrid-columnHeaders": {
            color: `${isDarkMode ? "#e5e7eb" : ""}`,
            '& [role="row"] > *': {
                backgroundColor: `${isDarkMode ? "#1d1f21" : "white"}`,
                borderColor: `${isDarkMode ? "#2d3135" : ""}`,
            },
        },
        "& .MuiDataGrid-virtualScrollerContent": {
            color: `${isDarkMode ? "#e5e7eb" : "#000000"}`,
        },
        "& .MuiIconbutton-root": {
            color: `${isDarkMode ? "#a3a3a3" : ""}`,
        },
        "& .MuiTablePagination-root": {
            color: `${isDarkMode ? "#a3a3a3" : ""}`,
        },
        "& .MuiTablePagination-selectIcon": {
            color: `${isDarkMode ? "#a3a3a3" : ""}`,
        },
        "& .MuiDataGrid-cell": {
            border: "none",
        },
        "& .MuiDataGrid-row": {
            borderBottom: `1px solid ${isDarkMode ? "#2d3135" : "e5e7eb"}`,
        },
        "& .MuiDataGrid-withBorderColor": {
            borderColor: `${isDarkMode ? "#2d3135" : "e5e7eb"}`,
        },
    };
};
const isValidDateFormat = (dateStr: string): boolean => {
    const regex = /^\d{4}\/\d{2}\/\d{2}$/;
    return regex.test(dateStr);
};
export const formatDate = ({
    startDate,
    dueDate,
}: {
    startDate: string | undefined;
    dueDate: string | undefined;
}) => {
    const formattedDate = (date: string | undefined) => {
        if (date && isValidDateFormat(date)) {
            return parseISO(
                date.replace(/^(\d{4})-(\d{2})-(\d{2})/, "$1-$3-$2"),
            ).getTime();
        } else {
            return parseISO(date ?? "").getTime();
        }
    };

    return {
        startDate: formattedDate(startDate),
        dueDate: formattedDate(dueDate),
    };
};
