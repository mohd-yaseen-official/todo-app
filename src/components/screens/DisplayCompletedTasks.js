import React from "react";
import { ReactComponent as Delete } from "../assets/delete.svg";
import { ReactComponent as Revert } from "../assets/revert.svg";
import { ReactComponent as Tick } from "../assets/tick-green.svg";
import styled from "styled-components";

export default function CompletedTaskList({
    completedTask,
    revertTask,
    deleteTask,
}) {
    return (
        <CTaskContainer>
            <SubHeading>Completed Tasks</SubHeading>
            <CTaskList>
                {completedTask.map((taskCompleted) => {
                    return (
                        <TaskItem key={taskCompleted.id}>
                            <TaskContent>
                                <CompleteButton>
                                    <Tick />
                                </CompleteButton>
                                <TaskTitle>{taskCompleted.id},</TaskTitle>
                                <TaskTitle>{taskCompleted.title}</TaskTitle>
                            </TaskContent>
                            <TaskControls>
                                <button
                                    onClick={() => revertTask(taskCompleted.id)}
                                >
                                    <Revert />
                                </button>
                                <button
                                    onClick={() =>
                                        deleteTask(taskCompleted.id)
                                    }
                                >
                                    <Delete />
                                </button>
                            </TaskControls>
                        </TaskItem>
                    );
                })}
            </CTaskList>
        </CTaskContainer>
    );
}

const CTaskContainer = styled.div`
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

const CTaskList = styled.ul`
    width: 90%;
    align-self: flex-end;
`;

const TaskItem = styled.li`
    display: flex;
    justify-content: space-between;
    margin-bottom: 12px;
    align-items: center;
`;

const TaskContent = styled.div`
    display: flex;
    color: #59c295;
`;

const TaskTitle = styled.h4`
    font-weight: 500;
    font-size: 32px;
`;

const TaskControls = styled.div`
    display: flex;
    width: 14%;
    justify-content: space-between;
`;

const CompleteButton = styled.button`
    border-radius: 50%;
    width: 35px;
    align-self: center;
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: none;
    border: 2px solid #59c295;
    margin-right: 18px;
`;
