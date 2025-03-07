import { Select, MenuItem, FormControl } from "@mui/material";

export default function SwitchLanguage({ appLanguage }) {
  const handleChange = (event) => {
    appLanguage(event.target.value);
  };

  return (
    <FormControl sx={{ minWidth: 120 }}>
      <Select
        defaultValue={2}
        onChange={handleChange}
        sx={{
          color: "inherit",
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "inherit",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "inherit",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "inherit",
          },
          "& .MuiSelect-icon": {
            color: "inherit",
          },
        }}
      >
        <MenuItem value={1}>فارسی</MenuItem>
        <MenuItem value={2}>English</MenuItem>
      </Select>
    </FormControl>
  );
}
