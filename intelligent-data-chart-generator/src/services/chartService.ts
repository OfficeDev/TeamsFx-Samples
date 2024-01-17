import { callFunction } from "./callFunction";

export async function sqlCompletion(q?: string): Promise<any> {
  try {
    const respData = await callFunction(
      "POST",
      "callService",
      {},
      { question: q }
    );
    return {
      data: respData["queryResult"],
      xKey: respData["xKey"],
      yKey: respData["yKey"],
      sqlString: respData["sqlString"],
    };
  } catch (e) {
    console.error(e);
    throw e;
  }
}
