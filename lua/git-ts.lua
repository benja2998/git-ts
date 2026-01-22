-- Git-ts Neoivm plugin

if vim.g.loaded_gitts == 1 then
   return
end

vim.g.loaded_gitts = 1

local M = {}

function M.open()
   if not vim.fn.executable("git-ts") == 1 then
      print("No git-ts found. See https://github.com/benja2998/git-ts for installation");
      return
   end
   
   -- Create a new scratch buffer for the floating terminal
   local buf = vim.api.nvim_create_buf(false, true) -- unlisted, scratch

   -- Determine the size of the floating window
   local width = math.floor(vim.o.columns * 0.8)
   local height = math.floor(vim.o.lines * 0.8)
   local row = math.floor((vim.o.lines - height) / 2)
   local col = math.floor((vim.o.columns - width) / 2)

   -- Window options
   local opts = {
      style = "minimal",
      relative = "editor",
      width = width,
      height = height,
      row = row,
      col = col,
      border = "rounded",
   }

   -- Open the floating window
   local win = vim.api.nvim_open_win(buf, true, opts)

   -- Start terminal in that buffer
   vim.fn.termopen("git-ts")
   vim.cmd("startinsert")
end

return M
