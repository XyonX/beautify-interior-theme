"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
  LinkIcon,
  ImageIcon,
  Quote,
  Code,
  Undo,
  Redo,
} from "lucide-react";
import { cn } from "@/lib/utils";
import DOMPurify from "dompurify";

export default function RichTextEditor({
  content,
  onChange,
  placeholder = "Start typing...",
  className,
}) {
  const editorRef = useRef(null);
  const [isActive, setIsActive] = useState({});
  const [showLinkDialog, setShowLinkDialog] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [showImageDialog, setShowImageDialog] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  console.log("RichTextEditor props:", { content, placeholder, className });

  useEffect(() => {
    console.log("RichTextEditor useEffect - content changed:", content);
    if (editorRef.current && content !== editorRef.current.innerHTML) {
      console.log("RichTextEditor: Setting content from props:", content);
      editorRef.current.innerHTML = content;
    }
  }, [content]);

  // Initialize editor when component mounts
  useEffect(() => {
    console.log("RichTextEditor: Component mounted, initializing editor");
    if (editorRef.current) {
      console.log("RichTextEditor: Editor ref found, setting initial content:", content);
      editorRef.current.innerHTML = content || "";
    }
  }, []);

  useEffect(() => {
    const updateActiveStates = () => {
      setIsActive({
        bold: document.queryCommandState("bold"),
        italic: document.queryCommandState("italic"),
        underline: document.queryCommandState("underline"),
        strikeThrough: document.queryCommandState("strikeThrough"),
        justifyLeft: document.queryCommandState("justifyLeft"),
        justifyCenter: document.queryCommandState("justifyCenter"),
        justifyRight: document.queryCommandState("justifyRight"),
        insertUnorderedList: document.queryCommandState("insertUnorderedList"),
        insertOrderedList: document.queryCommandState("insertOrderedList"),
      });
    };

    const handleSelectionChange = () => {
      updateActiveStates();
    };

    document.addEventListener("selectionchange", handleSelectionChange);
    return () =>
      document.removeEventListener("selectionchange", handleSelectionChange);
  }, []);

  const execCommand = (command, value) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
    if (editorRef.current) {
      const htmlContent = editorRef.current.innerHTML;
      console.log(`RichTextEditor execCommand ${command}:`, htmlContent);
      onChange(htmlContent || "");
    }
  };

  const handleInput = () => {
    if (editorRef.current) {
      const htmlContent = editorRef.current.innerHTML;
      console.log("RichTextEditor content changed:", htmlContent);
      onChange(htmlContent || "");
    }
  };

  //   const handlePaste = (e) => {
  //     e.preventDefault();
  //     const text = e.clipboardData.getData("text/plain");
  //     document.execCommand("insertText", false, text);
  //   };

  const handlePaste = (e) => {
    e.preventDefault();

    // Get clipboard data
    const html = e.clipboardData.getData("text/html");
    const text = e.clipboardData.getData("text/plain");

    if (html) {
      // Sanitize the HTML
      const cleanHtml = DOMPurify.sanitize(html);

      // Get the current selection and range
      const selection = window.getSelection();
      if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        range.deleteContents(); // Remove any selected content

        // Create a temporary div to parse the HTML
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = cleanHtml;

        // Check if there's content to insert
        if (tempDiv.firstChild) {
          const fragment = document.createDocumentFragment();
          let lastNode;

          // Move all nodes to the fragment and track the last one
          while (tempDiv.firstChild) {
            lastNode = tempDiv.firstChild;
            fragment.appendChild(lastNode);
          }

          // Insert the fragment into the editor
          range.insertNode(fragment);

          // Position the cursor after the last inserted node
          if (lastNode) {
            range.setStartAfter(lastNode);
            range.setEndAfter(lastNode);
            selection.removeAllRanges();
            selection.addRange(range);
          }
        } else {
          // If HTML is empty after sanitization, fall back to plain text
          if (text) {
            document.execCommand("insertText", false, text);
          }
        }
      }
    } else if (text) {
      // If no HTML, insert plain text
      document.execCommand("insertText", false, text);
    }
  };

  const insertLink = () => {
    if (linkUrl) {
      const selection = window.getSelection();
      if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        if (range.collapsed) {
          // No selection, insert URL as text first
          const textNode = document.createTextNode(linkUrl);
          range.insertNode(textNode);
          range.selectNodeContents(textNode);
          selection.removeAllRanges();
          selection.addRange(range);
        }
        execCommand("createLink", linkUrl);
      }
      setShowLinkDialog(false);
      setLinkUrl("");
    }
  };

  const insertImage = () => {
    if (imageUrl) {
      execCommand("insertImage", imageUrl);
      setShowImageDialog(false);
      setImageUrl("");
    }
  };

  const formatBlock = (tag) => {
    execCommand("formatBlock", tag);
  };

  const ToolbarButton = ({
    command,
    icon: Icon,
    title,
    value,
    isActiveKey,
  }) => (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      className={cn(
        "h-8 w-8 p-0",
        isActiveKey && isActive[isActiveKey] && "bg-stone-200"
      )}
      onClick={() => execCommand(command, value)}
      title={title}
    >
      <Icon className="h-4 w-4" />
    </Button>
  );

  return (
    <div className={cn("border rounded-md overflow-hidden", className)}>
      {/* Toolbar */}
      <div className="border-b bg-stone-50 p-2 flex flex-wrap gap-1">
        {/* Text Formatting */}
        <div className="flex gap-1 border-r pr-2 mr-2">
          <ToolbarButton
            command="bold"
            icon={Bold}
            title="Bold (Ctrl+B)"
            isActiveKey="bold"
          />
          <ToolbarButton
            command="italic"
            icon={Italic}
            title="Italic (Ctrl+I)"
            isActiveKey="italic"
          />
          <ToolbarButton
            command="underline"
            icon={Underline}
            title="Underline (Ctrl+U)"
            isActiveKey="underline"
          />
          <ToolbarButton
            command="strikeThrough"
            icon={Strikethrough}
            title="Strikethrough"
            isActiveKey="strikeThrough"
          />
        </div>

        {/* Headings */}
        <div className="flex gap-1 border-r pr-2 mr-2">
          <select
            className="text-sm border rounded px-2 py-1 bg-white"
            onChange={(e) => formatBlock(e.target.value)}
            defaultValue=""
          >
            <option value="">Normal</option>
            <option value="h1">Heading 1</option>
            <option value="h2">Heading 2</option>
            <option value="h3">Heading 3</option>
            <option value="h4">Heading 4</option>
            <option value="h5">Heading 5</option>
            <option value="h6">Heading 6</option>
          </select>
        </div>

        {/* Alignment */}
        <div className="flex gap-1 border-r pr-2 mr-2">
          <ToolbarButton
            command="justifyLeft"
            icon={AlignLeft}
            title="Align Left"
            isActiveKey="justifyLeft"
          />
          <ToolbarButton
            command="justifyCenter"
            icon={AlignCenter}
            title="Align Center"
            isActiveKey="justifyCenter"
          />
          <ToolbarButton
            command="justifyRight"
            icon={AlignRight}
            title="Align Right"
            isActiveKey="justifyRight"
          />
        </div>

        {/* Lists */}
        <div className="flex gap-1 border-r pr-2 mr-2">
          <ToolbarButton
            command="insertUnorderedList"
            icon={List}
            title="Bullet List"
            isActiveKey="insertUnorderedList"
          />
          <ToolbarButton
            command="insertOrderedList"
            icon={ListOrdered}
            title="Numbered List"
            isActiveKey="insertOrderedList"
          />
        </div>

        {/* Insert */}
        <div className="flex gap-1 border-r pr-2 mr-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => setShowLinkDialog(true)}
            title="Insert Link"
          >
            <LinkIcon className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => setShowImageDialog(true)}
            title="Insert Image"
          >
            <ImageIcon className="h-4 w-4" />
          </Button>
          <ToolbarButton
            command="formatBlock"
            icon={Quote}
            title="Quote"
            value="blockquote"
          />
          <ToolbarButton
            command="formatBlock"
            icon={Code}
            title="Code Block"
            value="pre"
          />
        </div>

        {/* Undo/Redo */}
        <div className="flex gap-1">
          <ToolbarButton command="undo" icon={Undo} title="Undo (Ctrl+Z)" />
          <ToolbarButton command="redo" icon={Redo} title="Redo (Ctrl+Y)" />
        </div>
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        className="min-h-[200px] p-4 focus:outline-none prose prose-stone max-w-none rich-text-content"
        onInput={handleInput}
        onPaste={handlePaste}
        onKeyDown={(e) => {
          console.log("RichTextEditor: Key pressed:", e.key);
          // Trigger onChange after a short delay to ensure content is updated
          setTimeout(() => {
            if (editorRef.current) {
              const htmlContent = editorRef.current.innerHTML;
              console.log("RichTextEditor: Content after key press:", htmlContent);
              onChange(htmlContent || "");
            }
          }, 10);
        }}
        data-placeholder={placeholder}
        style={{
          wordBreak: "break-word",
        }}
        suppressContentEditableWarning={true}
      />

      {/* Link Dialog */}
      {showLinkDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-semibold mb-4">Insert Link</h3>
            <input
              type="url"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              placeholder="Enter URL (https://...)"
              className="w-full border rounded px-3 py-2 mb-4"
              autoFocus
            />
            <div className="flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setShowLinkDialog(false);
                  setLinkUrl("");
                }}
              >
                Cancel
              </Button>
              <Button type="button" onClick={insertLink} disabled={!linkUrl}>
                Insert Link
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Image Dialog */}
      {showImageDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-semibold mb-4">Insert Image</h3>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="Enter image URL (https://...)"
              className="w-full border rounded px-3 py-2 mb-4"
              autoFocus
            />
            <div className="flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setShowImageDialog(false);
                  setImageUrl("");
                }}
              >
                Cancel
              </Button>
              <Button type="button" onClick={insertImage} disabled={!imageUrl}>
                Insert Image
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Custom Styles */}
      <style jsx>{`
        .rich-text-content:empty:before {
          content: attr(data-placeholder);
          color: #9ca3af;
          pointer-events: none;
        }

        .rich-text-content h1 {
          font-size: 2em;
          font-weight: bold;
          margin: 0.67em 0;
        }

        .rich-text-content h2 {
          font-size: 1.5em;
          font-weight: bold;
          margin: 0.75em 0;
        }

        .rich-text-content h3 {
          font-size: 1.17em;
          font-weight: bold;
          margin: 0.83em 0;
        }

        .rich-text-content h4 {
          font-size: 1em;
          font-weight: bold;
          margin: 1.12em 0;
        }

        .rich-text-content h5 {
          font-size: 0.83em;
          font-weight: bold;
          margin: 1.5em 0;
        }

        .rich-text-content h6 {
          font-size: 0.75em;
          font-weight: bold;
          margin: 1.67em 0;
        }

        .rich-text-content blockquote {
          margin: 1em 0;
          padding-left: 1em;
          border-left: 4px solid #e5e7eb;
          color: #6b7280;
        }

        .rich-text-content pre {
          background-color: #f3f4f6;
          padding: 1em;
          border-radius: 0.375rem;
          overflow-x: auto;
          font-family: "Courier New", monospace;
        }

        .rich-text-content ul {
          list-style-type: disc;
          padding-left: 2em;
          margin: 1em 0;
        }

        .rich-text-content ol {
          list-style-type: decimal;
          padding-left: 2em;
          margin: 1em 0;
        }

        .rich-text-content li {
          margin: 0.5em 0;
        }

        .rich-text-content a {
          color: #3b82f6;
          text-decoration: underline;
        }

        .rich-text-content img {
          max-width: 100%;
          height: auto;
          border-radius: 0.375rem;
        }
      `}</style>
    </div>
  );
}
