
// previously used but currently using num-extracter package published for test purposes

export default function useNumExtracter() {

    function number(string){
        const timeLeft = string.match(/\d+/);
        return timeLeft;
    }

  return {
      number
  }
}
