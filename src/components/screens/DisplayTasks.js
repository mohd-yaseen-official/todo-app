import React from "react";
import { ReactComponent as Delete } from "../assets/delete.svg";
import styled from "styled-components";

function TaskList({ tasks, completeTask, deleteTask }) {
    return (
        <UTaskContainer>
            <SubHeading>Things To Be Done</SubHeading>
            <UTaskList>
                {tasks?.map((task) => {
                    return (
                        <TaskItem key={task.id}>
                            <TaskContent>
                                <CompleteButton
                                    onClick={() => {
                                        completeTask(task.id);
                                    }}
                                ></CompleteButton>
                                <TaskTitle>{task.id},</TaskTitle>{" "}
                                <TaskTitle>{task.title}</TaskTitle>
                            </TaskContent>

                            <div className="controls">
                                <button
                                    onClick={() => {
                                        deleteTask(task.id);
                                    }}
                                >
                                    <Delete />
                                </button>
                            </div>
                        </TaskItem>
                    );
                })}
            </UTaskList>
        </UTaskContainer>
    );
}
const UTaskContainer = styled.div`
    display: flex;
    width: 50%;
    flex-direction: column;
    margin: 0 auto;
`;

const SubHeading = styled.h2`
    font-size: 36px;
    font-weight: 600;
    margin-bottom: 24px;
`;

const UTaskList = styled.ul`
    width: 90%;
    align-self: flex-end;
`;

const TaskItem = styled.li`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
`;

const TaskContent = styled.div`
    display: flex;
`;

const TaskTitle = styled.h4`
    font-weight: 500;
    font-size: 32px;
`;

const CompleteButton = styled.button`
    border-radius: 50%;
    width: 35px;
    align-self: center;
    height: 35px;
    background: transparent;
    margin-right: 18px;
    border: 2px solid #2d2d2d;
`;

export default TaskList;
