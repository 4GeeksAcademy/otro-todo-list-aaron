import React from "react";
import '/workspaces/otro-todo-list-aaron/src/styles/index.css';

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";
import Todo from "./Todo";
//create your first component
const Home = () => {
	return (
		<div>
			<Todo />
		</div>
	);
};

export default Home;