import React from 'react';

// Sample plain text content from the Word document
const wordDocumentContent = `
    <h1>Web Development</h1>
    ________________________________________________________________________________________________________________________________________________________
    <br></br>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut id leo est. Ut sit amet turpis accumsan, faucibus eros sed, tempus est. 
    Morbi dapibus felis vitae mi ornare dapibus. Curabitur vitae consectetur libero, a feugiat ante. Mauris blandit dui interdum lorem pharetra accumsan. Pellentesque 
    efficitur ipsum et tortor porttitor viverra. Aenean arcu augue, elementum sed commodo ut, pellentesque at tortor. In tincidunt ante orci, sed pretium
    urna condimentum sed. Phasellus eu sollicitudin massa.

    Mauris interdum fermentum dapibus. Mauris sed posuere metus. Nulla eget metus feugiat, sodales sem in, pharetra erat. Phasellus eu nunc diam. Curabitur
    hendrerit gravida odio, non varius nunc ultrices sed. Aliquam vitae aliquam sem. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices 
    posuere cubilia curae; Nullam at pellentesque neque. Curabitur odio augue, iaculis in dui ut, ultricies gravida tortor. Praesent non nulla vitae lorem
    dignissim dignissim at non neque. Nam in iaculis orci. Sed vitae orci nec felis sagittis pellentesque eu quis neque.

    Phasellus quis hendrerit sem, eget varius leo. Donec accumsan iaculis justo sed suscipit. Nam id pharetra nulla. Etiam condimentum orci non interdum 
    ultricies. Sed vel faucibus lacus, non porttitor justo. Maecenas vitae lacinia massa. Donec et hendrerit magna. Aliquam eget consectetur odio. Nulla
    facilisi. Integer bibendum pharetra enim vel aliquet. Nulla in dolor at velit ornare lacinia. Cras malesuada est urna, quis rhoncus dolor convallis ac.
    Praesent vitae ipsum justo.

    Duis mollis mauris vel lectus tristique, vitae pretium neque ornare. Maecenas dignissim malesuada scelerisque. Suspendisse blandit metus eget orci 
    sollicitudin, ut ultricies augue fermentum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut velit odio, pellentesque ut iaculis a, 
    fermentum quis lorem. Suspendisse molestie elementum arcu vel semper. Donec efficitur dictum sem sed placerat. Cras et bibendum lorem, ut scelerisque
    arcu. Etiam quis vehicula tellus. Maecenas pulvinar turpis nulla, sit amet pulvinar justo facilisis vel. Nam viverra felis vitae massa pharetra facilisis.
    Quisque aliquet mauris in euismod volutpat. Curabitur at nibh quis magna venenatis efficitur ac interdum nisi. Duis mollis augue a magna porttitor iaculis.

    Integer nec vestibulum justo, nec commodo ex. Suspendisse commodo dolor non est egestas lobortis. In hac habitasse platea dictumst. Nam pellentesque quam 
    nunc, eget viverra libero facilisis at. Nullam porta blandit erat, a dictum lacus pellentesque sit amet. Curabitur pharetra mattis sem, ac accumsan erat 
    rhoncus a. Aenean augue est, ultrices sed elit quis, laoreet semper nisl. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ultrices eros sit
    amet arcu posuere convallis. Mauris dapibus bibendum lacinia. Curabitur bibendum erat lectus, eu volutpat nunc maximus sed.
    ...
`;

function App() {
    const redirectToAnotherPage = () => {
        window.location.href = '/Video';
    };
    return (
        <div className="d-flex flex-column vh-80">
            <div className="container">
                <h2 className="mt-5">Title of Course</h2>
                
                <p className="lead">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut id leo est. Ut sit amet turpis accumsan, faucibus eros sed, tempus est. Morbi dapibus felis vitae mi ornare dapibus. Curabitur vitae consectetur libero, a feugiat ante. Mauris blandit dui interdum lorem pharetra accumsan. Pellentesque efficitur ipsum et tortor porttitor viverra</p>
            </div>
            
            <div className="container bg-light p-4 mt-auto rounded-lg" style={{ overflowX: 'hidden' }}>
                <div className="word-document" dangerouslySetInnerHTML={{ __html: wordDocumentContent }} />
            </div>
            
            <div className="container mt-3 d-flex justify-content-between">
                <div className="d-flex">
                    <button className="btn btn-secondary">Download</button>
                    <button className="btn btn-secondary ml-2">Print</button>
                </div>
            
                <button className="btn btn-secondary" onClick={redirectToAnotherPage}>Next</button>
        
            </div>
        </div>
    );
}

export default App;
