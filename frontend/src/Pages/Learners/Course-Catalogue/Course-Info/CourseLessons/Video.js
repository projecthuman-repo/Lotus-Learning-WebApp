import React from 'react';

function App() {
    const redirectToAnotherPage = () => {
        window.location.href = '/Audio';
    };

    return (
        <div className="d-flex flex-column vh-80">
            <div className="container">
                <h2 className="mt-5">Video Lecture</h2>
                
                <p className="lead">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut id leo est. Ut sit amet turpis accumsan, faucibus eros sed, tempus est. Morbi dapibus felis vitae mi ornare dapibus. Curabitur vitae consectetur libero, a feugiat ante. Mauris blandit dui interdum lorem pharetra accumsan. Pellentesque efficitur ipsum et tortor porttitor viverra</p>
            </div>
            
            <div className="container bg-light p-4 mt-auto rounded-lg d-flex justify-content-center align-items-center" style={{ overflowX: 'hidden' }}>
                <img src="https://img.icons8.com/?size=512&id=60449&format=png" alt="Video Icon" />
            </div>
            
            <div className="container mt-3 d-flex justify-content-between">
                <div className="d-flex">
                    {/* You can add content here */}
                </div>
            
                <button className="btn btn-secondary" onClick={redirectToAnotherPage}>Next</button>
            </div>
        </div>
    );
}

export default App;
