export const LANGUAGE_VERSIONS = {
    "javascript": "18.15.0",
    "typescript": "5.0.3",
    "python": "3.10.0",
    "java": "15.0.2",
    "csharp": "6.12.0",
    "php": "8.2.3",
    "cpp": "10.2.0"
};

export const LANGUAGE_STARTER_CODE = {
    cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    // Your code here
    cout << "Hello, World!" << endl;
    return 0;
}
`,

    c: `#include <stdio.h>

int main() {
    // Your code here
    printf("Hello, World!\\n");
    return 0;
}
`,

    python: `# Your code here
print("Hello, World!")
`,

    java: `public class Main {
    public static void main(String[] args) {
        // Your code here
        System.out.println("Hello, World!");
    }
}
`,

    javascript: `// Your code here
console.log("Hello, World!");
`,

    typescript: `// Your code here
const greeting: string = "Hello, World!";
console.log(greeting);
`,

    go: `package main
import "fmt"

func main() {
    // Your code here
    fmt.Println("Hello, World!")
}
`,

    ruby: `# Your code here
puts "Hello, World!"
`,

    rust: `fn main() {
    // Your code here
    println!("Hello, World!");
}
`,

    php: `<?php
// Your code here
echo "Hello, World!";
?>
`,

    swift: `import Foundation

// Your code here
print("Hello, World!")
`,

    kotlin: `fun main() {
    // Your code here
    println("Hello, World!")
}
`
};
