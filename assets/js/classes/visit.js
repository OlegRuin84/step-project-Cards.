class Visit {
  constructor(
    descriptionVisit,
    goalVisit,
    changeUrgency,
    changeStatus,
    namePatient
  ) {
    (this.descriptionVisit = descriptionVisit),
      (this.goalVisit = goalVisit),
      (this.changeUrgency = changeUrgency),
      (this.changeStatus = changeStatus),
      (this.namePatient = namePatient);
  }
  render() {}
}

export { Visit };
