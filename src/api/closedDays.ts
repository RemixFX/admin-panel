import { gql, TypedDocumentNode  } from "@apollo/client";

interface ClosedDays {
  date: string
  id: string
}

interface ClosedDaysData {
  getClosedDaysForAdmin: ClosedDays[];
}

interface ClosedDaysVars {
  month: number;
}

export const getClosedDays: TypedDocumentNode<ClosedDaysData, ClosedDaysVars> = gql(`
  query Query($month: Int)  {
    getClosedDaysForAdmin(month: $month) {
      date, id
    }
  }
`)


