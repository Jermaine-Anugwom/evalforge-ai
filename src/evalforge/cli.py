import json
from dataclasses import asdict

from .core import *


def main():
    print(
        json.dumps(
            asdict(
                evaluate(
                    Case("SYN-001", ("evidence",), ("fabricated",)),
                    "Answer grounded in evidence",
                    84,
                    0.002,
                )
            ),
            indent=2,
            default=str,
        )
    )
