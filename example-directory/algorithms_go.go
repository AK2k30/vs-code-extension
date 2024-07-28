package main

import (
	"fmt"
	"sort"
)

func main() {
	arr := []int{5, 2, 8, 1, 7}

	// Bubble Sort
	fmt.Println("Bubble Sort")
	fmt.Println("Before sorting:", arr)
	bubbleSort(arr)
	fmt.Println("After sorting:", arr)

	// Selection Sort
	fmt.Println("
Selection Sort")
	fmt.Println("Before sorting:", arr)
	sort.Slice(arr, selectionSort)
	fmt.Println("After sorting:", arr)

	// Insertion Sort
	fmt.Println("
Insertion Sort")
	fmt.Println("Before sorting:", arr)
	sort.Slice(arr, insertionSort)
	fmt.Println("After sorting:", arr)

	// Merge Sort
	fmt.Println("
Merge Sort")
	fmt.Println("Before sorting:", arr)
	arr = mergeSort(arr)
	fmt.Println("After sorting:", arr)

	// Quick Sort
	fmt.Println("
Quick Sort")
	fmt.Println("Before sorting:", arr)
	sort.Slice(arr, quickSort)
	fmt.Println("After sorting:", arr)
}

func bubbleSort(arr []int) {
	for i := 0; i < len(arr); i++ {
		for j := 0; j < len(arr)-i-1; j++ {
			if arr[j] > arr[j+1] {
				arr[j], arr[j+1] = arr[j+1], arr[j]
			}
		}
	}
}

func selectionSort(i, j int) bool {
	if arr[i] > arr[j] {
		return true
	}
	return false
}

func insertionSort(i, j int) bool {
	if arr[i] > arr[j] {
		return true
	}
	return false
}

func mergeSort(arr []int) []int {
	if len(arr) <= 1 {
		return arr
	}

	mid := len(arr) / 2
	left := mergeSort(arr[:mid])
	right := mergeSort(arr[mid:])

	return merge(left, right)
}

func merge(left, right []int) []int {
	merged := make([]int, len(left)+len(right))
	i, j, k := 0, 0, 0

	for i < len(left) && j < len(right) {
		if left[i] <= right[j] {
			merged[k] = left[i]
			i++
		} else {
			merged[k] = right[j]
			j++
		}
		k++
	}

	for i < len(left) {
		merged[k] = left[i]
		i++
		k++
	}

	for j < len(right) {
		merged[k] = right[j]
		j++
		k++
	}

	return merged
}

func quickSort(i, j int) bool {
	if arr[i] > arr[j] {
		return true
	}
	return false
}