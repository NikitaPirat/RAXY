/*
    This code defines processes in the situation.
*/

/*
    Process contains following fields:
    s - subject that does something.
    action - what subject does.
    actionType - which type of action is occuring.
    actionDirection - where goes the subject.
    actionTarget - the target of the action (name of subject).
*/
var processes = [];

var processActions = new Array();
processActions['move'] = 'move';
processActions['switchDirectionIndicator'] = 'switch direction indicator';

var processTypes = new Array();
processTypes['withoutDirectionChanging'] = 'without changing the direction';
processTypes['evolution'] = 'evolution'; // перестроение 
processTypes['maneuver'] = 'beginning of maneuver';

var processDirections = new Array();
processDirections['direct'] = 'direct';
processDirections['left'] = 'left';
processDirections['right'] = 'right';

function createProcess(newProcess){
    if (newProcess.s == 'empty' || newProcess.action == 'empty' ||
        newProcess.actionType == 'empty' || newProcess.actionDirection == 'empty'){
            return false;
        }
    if (processes.indexOf(newProcess) > -1){
        return false;
    }
    processes[processes.length] = newProcess;
    return true;
}