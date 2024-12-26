#!/usr/bin/env node

import { Project, SyntaxKind } from "ts-morph";
import { APP } from "./constants/app.js";

import fs from "node:fs";
import path from "node:path";

function addConsoleLogToFunctions(filePath: string): void {
	const project = new Project();
	const sourceFile = project.addSourceFileAtPath(filePath);

	const DEFAULT_SYNTAX_NAME = "<anonymous>";

	sourceFile.forEachDescendant((node) => {
		if (
			node.getKind() === SyntaxKind.FunctionDeclaration ||
			node.getKind() === SyntaxKind.MethodDeclaration ||
			node.getKind() === SyntaxKind.ArrowFunction ||
			node.getKind() === SyntaxKind.Constructor
		) {
			const body = node.getFirstChildByKind(SyntaxKind.Block);
			if (body) {
				let functionName = DEFAULT_SYNTAX_NAME;

				switch (node.getKind()) {
					case SyntaxKind.MethodDeclaration:
						functionName =
							node.asKindOrThrow(SyntaxKind.MethodDeclaration).getName() ||
							DEFAULT_SYNTAX_NAME;
						break;
					case SyntaxKind.FunctionDeclaration:
						functionName =
							node.asKindOrThrow(SyntaxKind.FunctionDeclaration).getName() ||
							DEFAULT_SYNTAX_NAME;
						break;
					case SyntaxKind.Constructor:
						functionName = node.isKind(SyntaxKind.Constructor)
							? `${node.getParent().getName()}.constructor` ||
								DEFAULT_SYNTAX_NAME
							: DEFAULT_SYNTAX_NAME;
						break;
					case SyntaxKind.ArrowFunction:
						// biome-ignore lint/correctness/noSwitchDeclarations: <explanation>
						const parent = node.getParent();
						if (parent?.getKind() === SyntaxKind.VariableDeclaration) {
							functionName = parent
								.asKindOrThrow(SyntaxKind.VariableDeclaration)
								.getName();
						} else if (parent?.getKind() === SyntaxKind.PropertyAssignment) {
							functionName = parent
								.asKindOrThrow(SyntaxKind.PropertyAssignment)
								.getName();
						}
						break;
				}

				const template = `console.log("⭐️[DEBUG:${APP.NAME}] ${functionName}");`;

				const firstStatement = body.getStatements()[0];
				if (
					firstStatement?.getKind() === SyntaxKind.ExpressionStatement &&
					firstStatement.getText().includes("console.log")
				) {
					firstStatement.replaceWithText(template);
				} else {
					body.insertStatements(0, template);
				}
			}
		}
	});

	// ファイルに保存
	fs.writeFileSync(filePath, sourceFile.getFullText());
}

// コマンドライン引数の処理
const args = process.argv.slice(2);
if (args.length === 0) {
	console.error(`Usage: ${APP.NAME} <file | dir>`);
	process.exit(1);
}

const inputPath = args[0];
if (!inputPath) {
	console.error(`Error: Path "${inputPath}" does not exist.`);
	process.exit(1);
}
if (!fs.existsSync(inputPath)) {
	console.error(`Error: Path "${inputPath}" does not exist.`);
	process.exit(1);
}

if (fs.statSync(inputPath).isDirectory()) {
	// ディレクトリ内のすべての TypeScript ファイルに適用
	const files = fs
		.readdirSync(inputPath)
		.filter((file) => file.endsWith(".ts"));
	for (const file of files) {
		const fullPath = path.join(inputPath, file);
		addConsoleLogToFunctions(fullPath);
		console.log(`[${APP.NAME}] console.log statements added to ${fullPath}`);
	}
} else {
	addConsoleLogToFunctions(inputPath);
	console.log(`[${APP.NAME}] console.log statements added to ${inputPath}`);
}
