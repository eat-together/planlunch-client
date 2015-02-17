#!/bin/bash
tmux set remain-on-exit on
tmux new-session -d 'vim'
tmux split-window -h 'ember server'
tmux resize-pane -x 50
tmux split-window 'ember test --server'
tmux split-window
tmux attach
