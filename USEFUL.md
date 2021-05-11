# Scheduler project breakdown

## Components

- Button
- DayList
- DayListItem
- InterviewerList
- InterviewerListItem
- Appointment
- Appointment/Header
- Appointment/Empty
- Appointment/Show
- Appointment/Form
- Appointment/Status
- Appointment/Error
- Appointment/Confirm

### Button
base, confirm, danger, disabled
https://s3-us-west-2.amazonaws.com/reactv2/figures/bd9fb736-7532-4449-9ef9-4812bd16ac4d.png

- State:
- Props:
- Used by:

### DayList

- State:
- Props:
    days:Array a list of day objects (each object includes an id, name, and spots)
    day:String the currently selected day
    setDay:Function accepts the name of the day eg. "Monday", "Tuesday"
- Used by:

### DayListItem

https://s3-us-west-2.amazonaws.com/reactv2/figures/e77d6027-1179-45b0-b73a-2d00c1af4f3c.png

- State:
- Props:
    name:String the name of the day
    spots:Number the number of spots remaining
    selected:Boolean true or false declaring that this day is selected
    setDay:Function accepts the name of the day eg. "Monday", "Tuesday"
- Used by:

### InterviewerList

- State:
- Props:
- Used by:

### InterviewerListItem

- State:
- Props:

    - id:number - the id of the interviewer
    - name:string - the name of the interviewer
    - avatar:url - a url to an image of the interviewer
    - selected:boolean - to determine if an interview is selected or not
    - setInterviewer:function - sets the interviewer upon selection
    
- Used by:

### Appointment

- State:
- Props:
- Used by:

### Appointment/Header

- State:
- Props:
- Used by:

### Appointment/Empty

- State:
- Props:
- Used by:

### Appointment/Show

- State:
- Props:
- Used by:

### Appointment/Form

- State:
- Props:
- Used by:

### Appointment/Status

- State:
- Props:
- Used by:

### Appointment/Error

- State:
- Props:
- Used by:

### Appointment/Confirm

- State:
- Props:
- Used by: