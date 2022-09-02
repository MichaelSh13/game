import { useMutation, useQueryClient } from "react-query";
import { Button } from "../../components/Button";
import { doRolling } from "../../http/game";
import { IBalance } from "../../http/session/interface";
import { Cashout } from "../cashout";
import "./index.scss"

const oneSec = () => new Promise((res) => (
  setTimeout(() => { res('') }, 1000)
))

type ISide = Pick<IBalance, 'balance'>

export const Side = ({ balance }: ISide) => {
  const queryClient = useQueryClient()

  const { mutate, isLoading } = useMutation(doRolling, {
    onSuccess: async ({ row, ...result }) => {
      const partialRow: string[] = [];

      for (let { index, item } of row.map((item, index) => ({ index, item }))) {
        partialRow.push(item)
        await oneSec()

        queryClient.setQueryData<IBalance | undefined>("balance", (data) => {
          if (!data) return;

          const last = index + 1 === row.length
          if (last) {

            return {
              row, ...result
            };
          }

          return {
            row: partialRow
          }
        })
      }
    }
  });

  const beforeMutation = async () => {
    await queryClient.setQueryData<IBalance | undefined>("balance", (data) => {
      if (!data) return;

      return { row: [] }
    })

    return mutate()
  }

  return (
    <div className="side-container">
      <Button onClick={() => { beforeMutation() }} disabled={isLoading || !balance}>
        Next
      </Button>

      <Cashout balance={balance} />
    </div>
  );
}