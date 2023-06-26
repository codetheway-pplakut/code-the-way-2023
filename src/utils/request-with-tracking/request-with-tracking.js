// isLoading, hasErrorValue, requestFunc, setIsLoading,
// setHasError,

export const requestWithTracking = async ({
  requestFunc,
  onSuccess,
  onFailure,
  onRequestStart,
  onRequestEnd,
}) => {
  if (!requestFunc) return;

  if (onRequestStart) onRequestStart();

  try {
    const response = await requestFunc();
    const { data } = response;

    if (onSuccess) onSuccess(data);
  } catch (error) {
    if (onFailure) onFailure(error);
  }

  if (onRequestEnd) onRequestEnd();
};
