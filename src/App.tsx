import {Route, Routes} from "react-router";
import {FC} from "react";
import {Todo} from "./Components/Todo";

const App: FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Todo/>}/>
        </Routes>
    );
};
export default App;