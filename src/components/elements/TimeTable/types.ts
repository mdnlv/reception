export interface PlaceItemEvent {
    startTime: Date
    endTime: Date
    patient: string
    service: string
    addInfo?: string
}


export interface PlaceItem {
    doc: string
    title: string
    unit: string
    events?: PlaceItemEvent[]
    children?: {
        [k: string]: PlaceItem
    }
}

export interface SelectedPlaceItem extends PlaceItem{
    selected?: boolean
    children?: {
        [k: string]: SelectedPlaceItem
    }
}
