import { Project } from "@/types/project";
import { Dispatch, SetStateAction, createContext } from "react";

export const ProjectContext = createContext<{ projectContext: Project | null, setProjectContext: Dispatch<SetStateAction<Project | null>> }>({
    projectContext: null,
    setProjectContext: () => (null),
});
