import { render, screen, waitFor } from "@testing-library/react";
import UserCard from "../components/UserCard";
import axios from "axios";

jest.mock("axios")

const axiosResponseMock = {
    data: {
        firstName: "Oleta",
        lastName: "Abbott",
        bank:{
            cardNumber: '3589640949470047',
            cardExpire: '10/23'
        }
    }
}

// const axiosResponseMock = {
//     data: userCardMock
// }

describe("UserCard", () => {
    test("testar o render", async ()=> {
        axios.get.mockResolvedValueOnce(axiosResponseMock)

        render(<UserCard />)
        screen.debug()

        await waitFor(() => {})
        screen.debug()
    })

    // test("renderiza inicialmente o loading" async ()=>{
    //     axios.get.mockResolvedValueOnce(axiosResponseMock)
    // })


    test("renderiza o cartão corretamente apos loading", async () => {
        axios.get.mockResolvedValueOnce(axiosResponseMock)
        render(<UserCard />)

        await waitFor(() => {
            const name = screen.getByText(/oleta abbott/i)
            const bankName = screen.getByText(/labebank/i)
            const cardNumber = screen.getByText(/3589 6409 4947 0047/i)
            const cardExpire = screen.getByText(/10\/23/i)
            const cvv = screen.getByText(/\*\*\*/i)

            expect(name).toBeInTheDocument()
            expect(bankName).toBeInTheDocument()
            expect(cardNumber).toBeInTheDocument()
            expect(cardExpire).toBeInTheDocument()
            expect(cvv).toBeInTheDocument()
        })
    })
})