import { useEffect, DependencyList } from "react";
import useTimeout from "./use-timeout";

export default function useDebounce<T extends (...args: any[]) => void>(
  callback: T,
  delay: number,
  dependencies: DependencyList
): void {
  const { reset, clear } = useTimeout(callback, delay);
  useEffect(reset, [...dependencies, reset]);
  useEffect(clear, []);
}
