import { Typography } from "@mui/material"

export const InputLabel = ({ label, align }: { label: string, align?: "right" | "left" | "inherit" | "center" | "justify" | undefined }) => {
    return (
        <Typography variant="subtitle2" align={align}>
            {label}
        </Typography>
    )
}