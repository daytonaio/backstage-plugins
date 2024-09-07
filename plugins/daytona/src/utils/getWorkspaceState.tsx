import { StatusAborted, StatusError, StatusOK, StatusPending, StatusRunning, StatusWarning } from "@backstage/core-components";
import React from "react";
import { State } from "../types";


/**
 * Method to create an indicator that gives -
 * colored dot paired with Workspace state text
 * @param props - Properties with the Workspace state
 * @returns a dot icon with the Workspace state text
 */
export const getWorkspaceState = (props: {
  status?: State;
}) => {

  if(props.status === undefined) return null; 

  return (
    <>
      <StateIndicator {...props} />
    </>
  );
};

/**
 * Gives a colored dot icon on different Workspace states
 * @param status for Workspace state  
 * @returns a colored indicator for the state
 */
export function StateIndicator({
    status,
  }: {
    status?: string;
  }) {
    
    let statusColor = '';
    let statusText = '';
  
    switch (status) {

        // Orange States
        case State.initializing:
            statusColor = 'orange';
            statusText = 'Initializing';
            break;

        case State.archiving:
            statusColor = 'orange';
            statusText = 'Archiving';
            break;

        case State.creating:
            statusColor = 'orange';
            statusText = 'Creating';
            break;
 
        case State.restoring:
            statusColor = 'orange';
            statusText = 'Restoring';
            break;

        case State.stopping:
            statusColor = 'orange';
            statusText = 'Stopping';
            break;

        case State.destroying:
            statusColor = 'orange';
            statusText = 'Warning';
            break;

        // Yellow States
        case State.pendingArchive:
            statusColor = 'yellow';
            statusText = 'Pending Archive';
            break;
            
        case State.pendingCreate:
            statusColor = 'yellow';
            statusText = 'Pending Create';
            break;
            
        case State.pendingRestore:
            statusColor = 'yellow';
            statusText = 'Pending Restore';
            break;
            
        case State.pendingStop:
            statusColor = 'yellow';
            statusText = 'Pending Stop';
            break;
            
        case State.pendingStart:
            statusColor = 'yellow';
            statusText = 'Pending Start';
            break;
            
        case State.pendingDestroy:
            statusColor = 'yellow';
            statusText = 'Pending Destroy';
            break;
            
        // Gray States
        case State.archived:
            statusColor = 'gray';
            statusText = 'Archived';
            break;
            
        case State.stopped:
            statusColor = 'gray';
            statusText = 'Stopped';
            break;
            
        case State.destroyed:
            statusColor = 'gray';
            statusText = 'Destroyed';
            break;
        
        // Green States
        case State.created:
            statusColor = 'green';
            statusText = 'Created';
            break;

        case State.restored:
            statusColor = 'green';
            statusText = 'Restored';
            break;

        case State.started:
            statusColor = 'green';
            statusText = 'Created';
            break;
        

        case State.starting:
            statusColor = 'green';
            statusText = 'Starting';
            break;
        
        // Red States
        case State.error:
            statusColor = 'red';
            statusText = 'Error';
            break;
        
        
        case State.none:
            statusColor = 'red';
            statusText = 'None';
            break;

        default:
            statusColor = 'gray';
            statusText = 'Unknown';
            break;
    }
  
    return (
      <div>
        <div
          style={{
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            backgroundColor: statusColor,
            display: 'inline-block',
            marginRight: '5px',
          }}
        />
        {statusText}
      </div>
    );
  };

/**
 * Gives a dot icon on different Workspace states
 * @param status for Workspace state  
 * @returns a colored indicator for the state
 */
export function StateIcon({
  status,
}: {
  status?: State;
}) {
  if (status === undefined) return null;
  switch (status) {
    case State.none:
        return <StatusWarning />;

    case State.initializing:
        return <StatusWarning />;

    // Archive States
    case State.pendingArchive:
        return <StatusPending />;
    
    case State.archiving:
        return <StatusWarning />;
        
    case State.archived:
        return <StatusAborted />;

    // Create States
    case State.pendingCreate:
        return <StatusPending />;

    case State.creating:
        return <StatusWarning />;
    
    case State.created:
        return <StatusOK />;

    // Restore States
    case State.pendingRestore:
        return <StatusPending />;

    case State.restoring:
        return <StatusWarning />;
    
    case State.restored:
        return <StatusOK />;

    // Stop States
    case State.pendingStop:
        return <StatusPending />;

    case State.stopping:
        return <StatusWarning />;
    
    case State.stopped:
        return <StatusAborted />;

    // Start States
    case State.pendingStart:
        return <StatusPending />;

    case State.starting:
        return <StatusRunning />;
    
    case State.started:
        return <StatusOK />;

    // Destroy States
    case State.pendingDestroy:
        return <StatusPending />;

    case State.destroying:
        return <StatusWarning />;
    
    case State.destroyed:
        return <StatusAborted />;

    case State.error:
      return <StatusError />;

    default:
      return <StatusPending />;
  }
}

/**
   * Gives the text output on different Workspace state
   * @param status for Workspace state 
   * @returns a text with the Workspace state
   */
export function getStateDescription({
  status,
}: {
  status?: State;
}) {
  if (status === undefined) return null;
  switch (status) {
    case State.none:
        return 'None';

    case State.initializing:
        return 'Initializing';

    // Archive States
    case State.pendingArchive:
        return 'Pending Archive';
    
    case State.archiving:
        return 'Archiving';
        
    case State.archived:
        return 'Archived';

    // Create States
    case State.pendingCreate:
        return 'Pending Create';

    case State.creating:
        return 'Creating';
    
    case State.created:
        return 'Created';

    // Restore States
    case State.pendingRestore:
        return 'Pending Restore';

    case State.restoring:
        return 'Restoring';
    
    case State.restored:
        return 'Restored';

    // Stop States
    case State.pendingStop:
        return 'Pending Stop';

    case State.stopping:
        return 'Stopping';
    
    case State.stopped:
        return 'Stopped';

    // Start States
    case State.pendingStart:
        return 'Pending Start';

    case State.starting:
        return 'Starting';
    
    case State.started:
        return 'Started';

    // Destroy States
    case State.pendingDestroy:
        return 'Pending Destroy';

    case State.destroying:
        return 'Destroying';
    
    case State.destroyed:
        return 'Destroyed';

    case State.error:
      return 'Error';

    default:
      return 'Pending';
  }

}