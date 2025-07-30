const Groups = () => {
    // Placeholder for future Redux or API state
    const groups = [
      { id: 1, name: 'Healthy Chefs' },
      { id: 2, name: 'Quick Meals Squad' },
      { id: 3, name: 'World Cuisine Explorers' },
    ];
  
    return (
      <div className="container mt-5">
        <h1 className="text-muted mb-4">Groups Page</h1>
  
        {/* Group List Placeholder */}
        <ul className="list-group mb-4">
          {groups.map(group => (
            <li key={group.id} className="list-group-item d-flex justify-content-between align-items-center">
              {group.name}
              <button className="btn btn-sm btn-outline-primary">Join</button>
            </li>
          ))}
        </ul>
  
        {/* Buttons for creating/joining groups */}
        <div className="d-flex justify-content-between">
          <button className="btn btn-success">Create Group</button>
          <button className="btn btn-primary">Join Group</button>
        </div>
      </div>
    );
  };
  
  export default Groups;