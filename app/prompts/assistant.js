
const prompts = {
    doc: { },
    gen: { }
}

let baseSystem = `
Act as a staff iOS engineer, specializing in UIKit, SwiftUI, SwiftData, CoreData, DocC syntax, 
markdown documentation, prototyping and unit testing. 
Be capable of creating code from provided prompt, and able to document code using Xcode DocC conventions.`

prompts.doc.swift = {
    system: baseSystem,
    user: `
    [INST]
    [CODE]@code[/CODE]
    
    Problem: enrich the provided code inside [CODE] and [CODE] tags with inline documentation.

    Do not document external frameworks or SDKs.
    Ensure your documentation is clean, comprehensive and prone for misinterpretation.
    Ensure the results can be used direct in Xcode with no compilation error.
    Ensure to not change the provided code.
    Ensure inline comments for code documentation is used only if code is too complex.
    Document structures classes enums and functions using DocC syntax.
    Always return documented code inside [DOC] and [/DOC] tags.
    [/INST]
    `
}

prompts.gen.swift = {
    system: baseSystem,
    user: `
    [INST]
    @intent

    Ensure to always use minimal and assertive code.
    Ensure to always only return the code.
    Respect struct class enum and function names when provided in prompt.
    When generating previews always use #Preview { code }.
    Always return generated code inside [CODE] and [/CODE] tags.
    [/INST]
    `
}

export const createDocumentationPrompt = (stack, code) => {
    return [
        {
            role: "system",
            content: prompts.doc[stack].system
        },
        {
            role: "user",
            content: prompts.doc[stack].user.replace("@code", code)
        }
    ]
}

export const createGenerationPrompt = (stack, intent) => {
    return [
        {
            role: "system",
            content: prompts.gen[stack].system
        },
        {
            role: "user",
            content: prompts.gen[stack].user.replace("@intent", intent)
        }
    ]
}
