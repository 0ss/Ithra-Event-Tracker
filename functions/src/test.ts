import { job } from "./job"

const test = async () => {
  await job()
}
test().catch((e) => {
  console.log("error :", e)
})
