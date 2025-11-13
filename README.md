# SlidePilot

A modern approach to presentation slides using ES Modules and Reveal.js, specifically designed for AI-assisted development.

For a live demo, check out [this page](https://yage.ai/slides/).

## Introduction

Cursor has freed us from manually writing most of our code, yet we still painstakingly assemble slides by hand. It's time to change that. Agentic Presentation Framework is a modern slide system optimized for AI-driven workflows rather than human fine-tuning. Each slide is an independent ES module, making it simpler for AI to create, edit, and manage complex presentations without wrestling with an entire deck.

With AI handling repetitive tasks, you stay focused on shaping meaningful content, adding the interactive elements you truly need, and telling an engaging story. No more perfecting font sizes or painstakingly arranging shapes—let your AI assistant handle the details. Whether you're experimenting with new ideas or scaling up a robust presentation, this approach shifts slide creation toward a more efficient, AI-guided process.

## Quick Start

The easiest way to use SlidePilot is to share the AI-instructions.md file directly with your AI assistant. Simply paste this link in your Cursor chat:

```
https://raw.githubusercontent.com/grapeot/cursor_slides/master/AI-instructions.md
```

Then ask your assistant to "Create a presentation for my current project" or similar. The AI will handle setup and initial slide creation based on your project content.

Or you can also manually clone the repo and `@AI-instructions.md` for a more flexible workflow.

### Running the Development Server

To start the development server with live reload:

```bash
# Activate the virtual environment (if using uv)
source .venv/bin/activate

# Start the server
python start-server.py

# Or specify a custom port
python start-server.py -p 8001
```

The server includes **live reload** functionality - any changes you make to HTML, CSS, or JavaScript files will automatically refresh in your browser. No manual refresh needed!

**Note**: The live reload feature is non-intrusive - it only injects JavaScript at runtime when accessed through the development server. Your source files remain unchanged.

## Designed for AI, Not Humans

This framework represents a fundamental shift in presentation design philosophy. Unlike traditional slide frameworks that prioritize human-authored content, our architecture is specifically optimized for AI-generated presentations.

### AI-First Design Philosophy

Most presentation frameworks are designed with human developers in mind, prioritizing simplicity of authoring over technical rigor. Our approach inverts this paradigm:

1. **AI-Optimized Architecture**: Each slide is an independent module, allowing AI systems to generate, modify, or enhance individual slides without needing to understand the entire presentation context.

2. **Technical Rigor Over Authoring Simplicity**: While JavaScript modules might be more complex than Markdown for humans, they provide the structure and predictability that AI assistants need to generate robust, interactive content.

3. **Modularity for AI Context Management**: AI assistants operate more effectively when working within constrained context windows. Our one-slide-per-file approach ensures AI can focus on a single component at a time.

4. **Standardized Interfaces**: The consistent export pattern (`html`, `initialize`, `cleanup`) creates a contract that AI systems can reliably implement, reducing errors and inconsistencies.

In essence, this framework treats AI as the primary author, with humans serving as reviewers and integrators. This inversion of the traditional development workflow enables far more powerful and complex presentations to be created with minimal human intervention.