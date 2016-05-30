/*
    this code defines relations between two situation subjects.
*/
var relations = [];

// list of the possible types.
var relationTypes = new Array(); 
relationTypes['isLocated'] = 'is located';//'находиться';

// list of the possible properties.
var relationProperties = new Array(); 
relationProperties['on'] = 'on';//'на';
relationProperties['beside'] = 'beside';//'рядом';

/*
    Adds new relation to the list.
    Params:
    s1 - first subject.
    s2 - second subject.
    type - relations type.
    property - relations property.
*/
function createRelation(s1,s2,type,property){
    var  relation = {s1: s1, s2: s2, type: type, property: property};
    var check = findRelationByAllFields(relation.s1, relation.s2, relation.type, relation.property);
    if (check.length > 0){
        return;
    }
    relations[relations.length] = relation;
}

/*
    Finds all relations with specific first subject.
    Params:
    name - subjects name.
*/
function findRelationsBySubject1(name){    
    return relations.filter(function (relation){
        return relation.s1 == name;
    });
}

/*
    Finds all relations with specific second subject.
    Params:
    name - subjects name.
*/
function findRelationsBySubject2(name){    
    return relations.filter(function (relation){
        return relation.s2 == name;
    });
}

function findRelationByAllFields(s1,s2,t,p){
    return relations.filter(function (rel){
        return rel.s1 == s1 && rel.s2 == s2 && 
		    rel.type == t && rel.property == p;
    });
}

function getRelationsToShow(){
    return relations.filter(function(rel){
        return !(rel.type == relationTypes["isLocated"] && rel.property == relationProperties["on"]); 
    });
}

/*
    Replaces old relation with a new one.
*/
function replaceRelation(oldRel, newRel){
    if (relations.indexOf(newRel) > -1){
        return false;
    }
    var index = relations.indexOf(oldRel);
    if (index > -1){
        relations.splice(index, 1, newRel);    
    }else{
        return false;
        //createRelation(newRel.s1, newRel.s2, newRel.type, newRel.property);
    }
    
    return true;
}