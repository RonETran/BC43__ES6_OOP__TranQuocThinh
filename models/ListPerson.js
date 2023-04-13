
export class ListPerson {
    arrPerson = [];
    addPerson(per) {
        this.arrPerson.push(per);
    }

    removePerson(id) {
        for (let index in this.arrPerson) {
            if (this.arrPerson[index].id === id) {
                this.arrPerson.splice(index, 1);
                break;
            }
        }
    }

    getInfoPerson(id) {
        for (let per of this.arrPerson) {
            if (per.id === id) {
                return per;
            }
        }
        return undefined;
    }

    updatePerson(per) {
        for (let person of this.arrPerson) {
            if (person.id == per.id) {
                for (let key in person) {
                    person[key] = per[key];
                }
            }
        }
    }

}

