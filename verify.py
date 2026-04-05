import anthropic, os, sys

skill_path = ".claude/skills/ui-ux-pro-max/SKILL.md"
installed = os.path.isfile(skill_path)

client = anthropic.Anthropic()
msg = client.messages.create(
    model="claude-opus-4-6",
    max_tokens=256,
    messages=[{
        "role": "user",
        "content": (
            f"UI/UX Pro Max skill install {'succeeded' if installed else 'FAILED'}. "
            f"SKILL.md {'found' if installed else 'MISSING'} at {skill_path}. "
            "Reply with a one-line status."
        )
    }]
)

print("Claude:", msg.content[0].text)

if not installed:
    print("ERROR: installation failed.")
    sys.exit(1)
