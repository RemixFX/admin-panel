import { gql, TypedDocumentNode } from "@apollo/client";

  interface ClosedDays {
  date: number
  id: string
}

interface ResponseStatusofDay {
  id: string
  status: string
}

export interface ClosedDaysData {
  getClosedDaysForAdmin: ClosedDays[]
  setClosedDay: ResponseStatusofDay
  deleteClosedDay: ResponseStatusofDay
}

interface GetClosedDaysVars {
  month: number
}

interface SetClosedDayVars {
  date: string
}

interface DeleteClosedDayVars {
  id: string
}

export const getClosedDays: TypedDocumentNode<ClosedDaysData, GetClosedDaysVars> = gql(`
  query Query($month: Int)  {
    getClosedDaysForAdmin(month: $month) {
      date, id
    }
  }
`)

export const setClosedDay: TypedDocumentNode<ClosedDaysData, SetClosedDayVars> = gql(`
  mutation Mutation($date: String) {
    setClosedDay(date: $date) {
      id, status
    }
  }
`)

export const setOpenDay: TypedDocumentNode<ClosedDaysData, DeleteClosedDayVars> = gql(`
  mutation Mutation($id: ID) {
    deleteClosedDay(id: $id) {
      id, status
    }
  }
`)
