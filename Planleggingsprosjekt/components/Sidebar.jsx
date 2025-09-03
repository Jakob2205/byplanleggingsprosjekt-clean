import FormSelector from "./FormSelector"; // Adjust the path as needed
import PropTypes from "prop-types";

const Sidebar = ({ selectedForm, onSelectForm }) => {
  return (
    <aside className="sidebar">
      <div className="sidebar-top">
        {/* Render the FormSelector here */}
        <FormSelector selectedForm={selectedForm} onSelectForm={onSelectForm} />
      </div>
      <div className="sidebar-bottom">
      </div>
    </aside>
  );
};

Sidebar.propTypes = {
  selectedForm: PropTypes.any,
  onSelectForm: PropTypes.func.isRequired,
};

export default Sidebar;
