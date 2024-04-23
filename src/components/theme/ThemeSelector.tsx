
import { useState } from "react";
import themes from "@/lib/themes.json";
import { getCookie, setCookie } from "@/lib/cookie";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const ThemeSelector = () => {
  const currentTheme = getCookie("currentTheme");
  const [copyValue, setCopyValue] = useState(
    themes.find((t) => t.theme === currentTheme)?.values || "",
  );

  return (
    <div className=" right-0 top-0 flex items-center gap-4 rounded-[0.5rem] text-sm font-medium">
      <Select
        defaultValue={currentTheme || "default"}
        onValueChange={(value) => {
          setCookie("currentTheme", value, { expires: 30 });
          setCopyValue(themes.find((t) => t.theme === value)?.values || "");
          window.location.reload();
        }}
      >
        <SelectTrigger
          id="theme-selector"
          className="line-clamp-1 w-[120px] truncate"
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="default">Default</SelectItem>
          <SelectItem value="documentation">Documentation</SelectItem>
          <SelectItem value="ocean">Ocean</SelectItem>
          <SelectItem value="sunset">Sunset</SelectItem>
          <SelectItem value="crimson">Crimson</SelectItem>
          <SelectItem value="forest">Forest</SelectItem>
          <SelectItem value="sapphire">Sapphire</SelectItem>
          <SelectItem value="sunrise">Sunrise</SelectItem>
          <SelectItem value="royal">Royal</SelectItem>
          <SelectItem value="violet">Violet</SelectItem>
          <SelectItem value="wally">Wally</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default ThemeSelector;