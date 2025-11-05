// In src/pages/PlanPage.jsx

function StageRenderer() {
    const { planId, stageId } = useParams();
    const plan = getPlanById(planId);
    const stage = plan?.stages.find(s => s.id === stageId);

    if (!stage) {
        return <div>Stage not found!</div>;
    }

    const StageComponent = stage.component;
    // Pass the entire data object to the component
    return <StageComponent data={stage.data} />;
}// In src/pages/PlanPage.jsx

function StageRenderer() {
    const { planId, stageId } = useParams();
    const plan = getPlanById(planId);
    const stage = plan?.stages.find(s => s.id === stageId);

    if (!stage) {
        return <div>Stage not found!</div>;
    }

    const StageComponent = stage.component;
    // Pass the stage name as a title prop, along with the data
    return <StageComponent title={stage.name} data={stage.data} />;
}

