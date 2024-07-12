import { ref } from "vue";
export function serverSetup() {
  const serverData = ref("http://192.168.1.145/riva4/");
  return {
    serverData,
  };
}
export function yearInputShow() {
  const yearInput = ref({
    min: 2010,
    max: 2021,
  });
  return {
    yearInput,
  };
}
